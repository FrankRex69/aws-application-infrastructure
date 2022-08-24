# Voting Platform

## Pre-requisites

- [Node](https://nodejs.org/en/): 16.14.2
- [Npm](https://www.npmjs.com/package/npm): 8.5.0

If this is your first approach to [Node](https://nodejs.org/en/), please consider to install it via [NVM](http://nvm.sh).

## How to

You need to have Nodejs v16.14.2 (the version is tracked in the .nvmrc file) installed on your system. Once you are ready to start, run the following commands:

```
nvm use
npm install
npm run setup
npm run compile
```

----------------------------------------------------------------------------------------------------

* ## STATUS VOTE SECTION
* ### Global deploy for Status Vote Section
* `npm run dev:sv`  compile typescript to js (only config-components and create terraform infrastructure lambdas + stepfunction)

    * #### Partial deploy
    * `npm run lstus`   compile typescript to js "lambda-send-table-update-sns"    
    * `npm run dev:ah`   compile typescript to js "aggregator-handler"
    * `npm run dev:ldsh`   compile typescript to js "lambda-dynamo-stream-handler"
    * `npm run dev:luptt`   compile typescript to js "lambda-update-phase-task-token"
    * `npm run dev:vbox`   compile typescript to js "status-voting-box-handler"
    
    * #### Create infrastructure
    * `terraform init`   initialization infrastructure Aws with Terraform ONLY case some change
    * `npm run dev:terraform-sv`   create infrastructure Aws (lambda + stepfunction) with Terraform for Status Vote section
    * `npm run dev:terraform-opensearch`   create infrastructure Aws OpenSearch (ElasticSearch) with Terraform 
    
    * #### Global
    * `npm run dev:sv`   deploy (ldsh, luptt, vbox) + create infrastructure Aws for Status Vote section
    * `npm run dev:aggreg`   deploy ah + create infrastructure Aws for Lambda Aggregate with Terraform
# aws-a-i
