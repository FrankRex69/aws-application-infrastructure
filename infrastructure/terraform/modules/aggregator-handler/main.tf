// Create AWS Lambda functions
resource "aws_lambda_function" "openSearchHandler" {  
  filename         = var.aws_output_aggregator_handler
  function_name    = "aggregator_handler"
  role             = aws_iam_role.iam_for_openSearchHandler.arn
  handler          = "index.openSearchHandler"
  source_code_hash = data.archive_file.aggregator_handler_zip.output_base64sha256
  runtime          = "nodejs14.x"
  environment {
    variables = {
      opensearch_arn = var.opensearch_arn
      index_opensearch = var.index_opensearch
      domain_endpoint = var.domain_endpoint
    }
  }
}


# resource "aws_lambda_function" "openSearchHandler" {  
#   filename         = var.aws_output_aggregator_handler
#   function_name    = "aggregator_handler"
#   role             = aws_iam_role.iam_for_aggregator_handler.arn
#   handler          = "index.openSearchHandler"
#   source_code_hash = data.archive_file.aggregator_handler_zip.output_base64sha256
#   runtime          = "nodejs14.x"
# }

data "archive_file" "aggregator_handler_zip" {
  type          = "zip"
  source_dir   = "../../config-components/aggregator-handler/build/"
  output_path   = var.aws_output_aggregator_handler 
}

resource "aws_iam_role" "iam_for_openSearchHandler" {
  name = "iam_for_iam_for_openSearchHandler"

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

// Create IAM role for AWS aggregator-handler

resource "aws_iam_policy" "policy_for_aggregator_handler" {
  name        = "aggregatorHandlerPolicy"  

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
        "logs:PutLogEvents",
        "es:*"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

// Attach policy to IAM Role for Lambda
resource "aws_iam_role_policy_attachment" "iam_for_openSearchHandler" {
  role       = aws_iam_role.iam_for_openSearchHandler.name
  policy_arn = aws_iam_policy.policy_for_aggregator_handler.arn
}