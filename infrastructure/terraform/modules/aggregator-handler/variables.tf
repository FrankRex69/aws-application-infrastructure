variable "aws_output_aggregator_handler" {
  default = "./output/aggregator_handler.zip"
}

variable "opensearch_arn" {}

variable "index_opensearch" {
  type = string
}
variable "domain_endpoint" {
  type = string
}


