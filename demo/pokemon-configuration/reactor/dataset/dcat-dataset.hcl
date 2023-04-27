class = "dcat:Dataset"

extends = [
  "rdfs:Resource"]

precedence_over = ["http://www.w3.org/ns/prov#Entity"]

widget infobox perspective _ {

  property = {
    "http://purl.org/dc/terms/issued" = {
      priority = 300
      name = {
        en = "Issuing Time"
        de = "Ausgabezeit"
      }

      collection = {
        collection_handler = "CommaSeparatedList"
        object = {
          type = {
            literal = {
              object_handler = "DateTime"
            }
          }
        }
      }
    }
    "dcat:keyword" = {
      priority = 290
      name = {
        en = "Keywords"
        de = "Schlüsselworte"
      }
    }

    "http://www.w3.org/ns/prov#hadPrimarySource" = {
      priority = 10
      name = {
        en = "Primary Source"
        de = "Primärquelle"
      }
      collection = {
        collection_handler = "CommaSeparatedList"
        object = {
          type = {
            literal = {
              object_handler = "ExternalLink"
            }
            iri = {
              object_handler = "ExternalLinkView"
            }
          }
        }
      }
    }

  }

  sections = [
    "related"]

  section {

    __main__ {

      neighbourhood {
        exclude = [
          "http://www.w3.org/2000/01/rdf-schema#label",
          "http://purl.org/dc/terms/title",
          "http://www.w3.org/2000/01/rdf-schema#comment",
          "http://purl.org/dc/terms/description",
          "http://purl.org/dc/terms/abstract",
          "http://xmlns.com/foaf/0.1/depiction",
          "http://www.w3.org/2002/07/owl#sameAs",
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",]
      }

      config {
        label = [
          "http://www.w3.org/2000/01/rdf-schema#label",
          "http://purl.org/dc/terms/title",
        ],
        description = [
          "http://www.w3.org/2000/01/rdf-schema#comment",
          "http://purl.org/dc/terms/description",
          "http://purl.org/dc/terms/abstract",
        ],
        depiction = [
          "http://xmlns.com/foaf/0.1/depiction"
        ]
      }
    }

    related {
      sectionHandler = "SimilaritySection"
      name {
        en = "Related Datasets"
        de = "Ähnliches"
      }
      hint {
        en = "Related datasets to the currently viewed one."
        de = "Ähnliche Datensätze, die interessant sein könnten."
      }
      expand = true
      config {
        number = 4
        classes = ["dcat:Dataset"]
        ranking {
          peer {
            step = "esm.exploit.sim.resnik"
            weight = 1.0
          }
        }
      }
    }
  }
}