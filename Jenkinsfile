#!/usr/bin/env groovy
/* groovylint-disable CompileStatic, DuplicateStringLiteral, LineLength, NestedBlockDepth, NglParseError, NoDef, NoWildcardImports, UnnecessaryGString, VariableTypeRequired */
@Library(value='jenkins-ci-library', changelog=false)
import it.sky.dp.jenkins.slack.*
import it.sky.dp.jenkins.env.*
import it.sky.dp.jenkins.jenkinsauthorizer.*
// To create dynamics envs
import groovy.json.JsonSlurperClassic
def slackInfo
def slackNotifier
def startMessage
def dockerImagePollService = 'poll-service'
def dockerImageVoteService = 'vote-service'
def dockerImagePollServiceDir = 'sync-components/services/poll-service'
def dockerImageVoteServiceDir = 'sync-components/services/vote-service'
String slackMessage
String agentLabel = 'sky-votingformat-dev'
String projectPrefix = 'vtg'
pipeline {
    agent { label agentLabel }
    environment {
        SLACK_URL = 'https://sky.slack.com/services/hooks/jenkins-ci/'
        SLACK_TOKEN_CREDENTIAL_ID = 'votingplatform-slack-integration'
        SLACK_CHANNEL = 'su-votingplatform-rilascio'
        DOCKER_RUN_PARAMS = '-u jenkins -e NODE_PATH=/home/ -v /home/jenkins/:/home/jenkins/ -e AWS_DEFAULT_REGION=eu-west-1'
        DEFAULT_REGION = 'eu-west-1'
        TARGET_ENV = "dev"
    }
    parameters {
        string(name: 'RELEASE_BRANCH', defaultValue: 'FSU_75-voteService-mock')
    }
    stages {
        stage('Setup') {
            steps {
                script {
                    slackInfo = new SlackInfo("${SLACK_URL}", "${SLACK_TOKEN_CREDENTIAL_ID}", "${SLACK_CHANNEL}")
                    slackNotifier = new SlackNotifier(this, env, currentBuild, slackInfo)
                    startMessage = 'Starting monitoring pipeline'
                    slackNotifier.notifyBuildStarted(startMessage)
                }
            }
        }
        // Download env variables from AWS SSM
        stage('Download env variables') {
            steps {
                script {
                    // Returns details about the IAM user or role whose credentials are used to call the operation.
                    sh('aws sts get-caller-identity')
                    // Returns details about the IAM user or role whose credentials are used to call the operation.
                    def paramPrefix = "/${projectPrefix}/${env.TARGET_ENV}/"
                    // Retrive params under before declared pattern
                    def rawParams = sh(returnStdout: true, script: "aws ssm get-parameters-by-path --path /${projectPrefix}/${env.TARGET_ENV}/ --recursive --with-decryption --region eu-west-1")
                    // Convert them in JSON object
                    def paramsObj = new JsonSlurperClassic().parseText(rawParams)
                    // Create dinamically env variables
                    print("########################################")
                    print("Print downloaded env vars")
                    print("########################################")
                    sh("touch env-next-${TARGET_ENV}")
                    paramsObj.Parameters.each{ p ->
                        def varName = p.Name - paramPrefix
                        varName = varName.toUpperCase()
                        env."${varName}" = "${p.Value}"
                        sh("echo '${varName}=${p.Value}'")
                    }
                }
            }
        }
        stage('Checkout to release branch') {
            steps {
                script {
                    sh('git checkout $RELEASE_BRANCH')
                }
            }
        }
        // Set up docker container for Node app
        stage('Build and push docker container of poll-service') {
            steps {
                script {
                    sh('aws sts get-caller-identity')
                    sh("aws --version")
                    sh("aws ecr get-login-password --region ${DEFAULT_REGION} | docker login --username AWS --password-stdin 748903534194.dkr.ecr.eu-west-1.amazonaws.com")
                    sh("docker build -t ${dockerImagePollService} ./${dockerImagePollServiceDir}")
                    sh("docker tag poll-service:latest ${ECR_POLL_SERVICE_REPOSITORY_URL}:latest")
                    sh("docker push ${ECR_POLL_SERVICE_REPOSITORY_URL}:latest")
                }
            }
        }
        stage('Scan code with SAST tool'){
            steps {
                build job: "sast-scanner", parameters:
                            [
                                    string(name: 'OWNER_REPO_NAME', value: scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]),
                                    string(name: 'BRANCH', value: env.RELEASE_BRANCH),
                            ],
                            propagate: false, wait: false
            }
        }
        stage('Create ECS POLL SERVICE'){
            steps{
                script{
                    sh("envsubst < ./${dockerImagePollServiceDir}/task_definition.json > ./task_definition_templated.json")
                    sh("cat ./task_definition_templated.json")
                    sh("aws ecs register-task-definition --cli-input-json file://\$(pwd)/task_definition_templated.json --execution-role-arn ${ECS_EXECUTION_ROLE_ARN} --network-mode awsvpc --cpu 256 --memory 512 --region eu-west-1")
                    sh("aws ecs create-service --cluster ${ECS_VOTING_FARGATE_CLUSTER_NAME} --service-name ${dockerImagePollService} --task-definition poll-service --launch-type FARGATE --network-configuration \"awsvpcConfiguration={subnets=[${VOTING_SUBNET_PRIVATE_IDS}],securityGroups=[${SG_ALLOW_PORT_80_ID}],assignPublicIp=DISABLED}\" --desired-count 1 --region eu-west-1")
                    sh("rm ./task_definition_templated.json")
                    // --load-balancers \"targetGroupArn=${INTERNAL_ALB_TARGET_GROUP_ARN},loadBalancerName=${internal_alb_name},containerName=poll-service,containerPort=80\"
                }
            }
        }
        //BUILD AND PUSH OF VOTE-SERVICE
        stage('Build and push docker container of vote-service') {
            steps {
              script { 
                    sh('aws sts get-caller-identity')
                    sh("aws ecr get-login-password --region ${DEFAULT_REGION} | docker login --username AWS --password-stdin 748903534194.dkr.ecr.eu-west-1.amazonaws.com")
                    sh("docker build -t ${dockerImageVoteService} ./${dockerImageVoteServiceDir}")
                    sh("docker tag vote-service:latest ${ECR_VOTE_SERVICE_REPOSITORY_URL}:latest")
                    sh("docker push ${ECR_VOTE_SERVICE_REPOSITORY_URL}:latest")
                  
              }
            }
        }
        stage('Create ECS VOTE SERVICE'){
            steps{
                script{
                    sh("envsubst < ./${dockerImageVoteServiceDir}/task_definition.json > ./task_definition_templated.json")
                    sh("cat ./task_definition_templated.json")
                    sh("aws ecs register-task-definition --cli-input-json file://\$(pwd)/task_definition_templated.json --execution-role-arn ${ECS_EXECUTION_ROLE_ARN} --network-mode awsvpc --cpu 256 --memory 512 --region eu-west-1")
                    sh("aws ecs create-service --cluster ${ECS_VOTING_FARGATE_CLUSTER_NAME} --service-name ${dockerImageVoteService} --task-definition vote-service --launch-type FARGATE --network-configuration \"awsvpcConfiguration={subnets=[${VOTING_SUBNET_PRIVATE_IDS}],securityGroups=[${SG_ALLOW_PORT_80_ID}],assignPublicIp=DISABLED}\" --desired-count 1 --region eu-west-1")
                    sh("rm ./task_definition_templated.json")
                }
            }
        }
    } 
    post {
        failure {
            script {
                slackNotifier.notifyBuildFailed(slackMessage)
            }
        }
        success {
            script {
                slackNotifier.notifyBuildSuccess(slackMessage)
            }
        }
        always {
            cleanWs()
        }
    }
}
