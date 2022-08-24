variable "domain" {
    type = string
}
variable "instance_type" {
    type = string
}
variable "tag_domain" {
    type = string
}
variable "volume_type" {
    type = string
}
variable "ebs_volume_size" {
    type = number
}
variable "tls_security_policy" {
    type = string
}
variable "advanced_security_options" {
  description = "Options for fine-grained access control"
  type        = any
  default     = {}
}
variable "master_user_name" {
    type = string
}
variable "master_user_password" {
    type = string
}
variable "elasticsearch_version" {
    type = string
}
variable "index_opensearch" {
  type = string
}
variable "aggregator_handler_role_arn" {
    type = string
}
