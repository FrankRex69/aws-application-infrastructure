data "archive_file" "status_voting_box_handler_zip" {
  type          = "zip"
  source_dir   = "../../config-components/status-voting-box-handler/build/"
  output_path   = var.aws_output_status_voting_box_handler 
}

// Create IAM role for AWS status-voting-box-handler
resource "aws_iam_role" "iam_for_status_voting_box_handler" {
  name = "iam_for_status_voting_box_handler"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "policy_for_status_voting_box_handler" {
  name        = "StatusVotingBoxHandlerPolicy"  

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
          "ses:SendEmail",
          "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

// Attach policy to IAM Role for Lambda
resource "aws_iam_role_policy_attachment" "iam_for_lambda_attach_policy_status_voting_box_handler" {
  role       = aws_iam_role.iam_for_status_voting_box_handler.name
  policy_arn = aws_iam_policy.policy_for_status_voting_box_handler.arn
}

// Attach policy to IAM Role for Lambda for create ENIs (virtual network cards) in the private subnet
resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_lambda_vpc_access_execution" {
  role       = aws_iam_role.iam_for_status_voting_box_handler.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

// Create AWS Lambda functions
resource "aws_lambda_function" "status_voting_box_handler" {  
  filename         = var.aws_output_status_voting_box_handler
  function_name    = "status_voting_box_handler"
  role             = aws_iam_role.iam_for_status_voting_box_handler.arn
  handler          = "index.init"
  source_code_hash = data.archive_file.status_voting_box_handler_zip.output_base64sha256
  runtime          = "nodejs14.x"
  # vpc_config {
  #   # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
  #   subnet_ids         = [var.voting-subnet-public1-eu-west-1a-id]
  #   security_group_ids = [var.sg_allowed_sg]
  # }
  environment {
    variables = {
      CAMEL_ENDPOINT = var.camel_endpoint
      DRY_RUN_INVOKE_CAMEL = var.dry_run_invoke_camel
      EMAIL_SOURCE_VOTINGXML = var.email_source_votingxml
      EMAIL_DESTINATION_VOTINGXML= var.email_destination_votingxml      
      region = "eu-west-1"
    }
  }

}