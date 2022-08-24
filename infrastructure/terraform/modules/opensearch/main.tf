# Creating the Elasticsearch domain 
resource "aws_elasticsearch_domain" "es" {
  domain_name = var.domain
  elasticsearch_version = var.elasticsearch_version
  cluster_config {
    instance_type = var.instance_type
  }

  advanced_security_options {
    enabled             = true
    internal_user_database_enabled = true
    master_user_options {      
      master_user_name = var.master_user_name
      master_user_password = var.master_user_password
    }
  }


  domain_endpoint_options {
    enforce_https = true
    tls_security_policy = var.tls_security_policy
  }
  encrypt_at_rest {
    enabled = true
  }
  node_to_node_encryption {
      enabled = true
  }
  ebs_options {
    ebs_enabled = var.ebs_volume_size > 0 ? true : false
    volume_size = var.ebs_volume_size
    volume_type = var.volume_type
  }
  tags = {
    Domain = var.tag_domain
  }
}

# Create a role mapping
# resource "elasticsearch_opendistro_roles_mapping" "mapper" {
#   role_name     = "logs_writer"
#   description   = "Mapping AWS IAM roles to ES role"
#   backend_roles = [
#     var.aggregator_handler_role_arn
#   ]
# }

 
# Creating the AWS Elasticsearch domain policy 
resource "aws_elasticsearch_domain_policy" "main" {
  domain_name = aws_elasticsearch_domain.es.domain_name
  access_policies = <<POLICIES
{
    "Version": "2012-10-17",
    "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "*"
          },       
          "Action": "es:*",
          "Resource": "${aws_elasticsearch_domain.es.arn}/*"         
        }
    ]
}
POLICIES
}