terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  # Assuming you have a kubeconfig file configured
  # or are running this from within a Kubernetes cluster.
}

resource "local_file" "kubeconfig" {
    # this will create an empty file, replace this
    # with a method to retrieve a kubeconfig
    # from a cloud provider (aws eks, google gke etc.)
    content = "replace me with your kubeconfig"
    filename = "kubeconfig"
}
