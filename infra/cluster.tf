terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "google" {
  project     = "<your-gcp-project-id>" # Replace with your GCP project ID
  region      = "us-central1"
}

resource "google_container_cluster" "primary" {
  name     = "morning-brew-cluster"
  location = "us-central1-a"
  initial_node_count = 1
  remove_default_node_pool = true

}

resource "google_container_node_pool" "primary_nodes" {
  name       = "default-node-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }
}

data "google_client_config" "default" {}

provider "kubernetes" {
  host  = google_container_cluster.primary.endpoint
  token = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)

}

output "cluster_name" {
  value = google_container_cluster.primary.name
}
output "cluster_endpoint" {
  value = google_container_cluster.primary.endpoint
}