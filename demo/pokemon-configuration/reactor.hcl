widget infobox {
  type iri {
    pattern {
      "*" {
        perspective _ {

          section {
            __main__ {
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
          }

        }
      }
    }
    instanceOf {
      "http://pokemon.outofbits.com/ontology#Pokémon" {
        precedenceOver = [
          "p:*"]
        perspective _ {
          sections = [
            "img_table",
            "similar"]

          properties {
            pattern {
              "http://pokemon.outofbits.com/ontology#hasType" {
                name {
                  en = "Type"
                  de = "Typ"
                }
                collectionHandler = ""
              }
              "http://pokemon.outofbits.com/ontology#hasColor" {
                name {
                  en = "Colour"
                  de = "Farbe"
                }
                collectionHandler = ""
              }
              "http://pokemon.outofbits.com/ontology#species" {
                name {
                  en = "Species"
                  de = "Spezie"
                }
                collectionHandler = ""
              }
            }
          }

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
                  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  "http://pokemon.outofbits.com/ontology#describedInPokédex",]
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
            img_table {
              expanded = false
              name {
                en = "Depiction",
                de = "Abbildung",
              }
              neighbourhood {
                include = [
                  "http://xmlns.com/foaf/0.1/depiction"]
              }
              handler = "ProvenanceTableSection",
            }
            similar {
              expanded = true
              name {
                en = "See Also",
                de = "Siehe Auch",
              }
              config {
                number = 4,
                classes = [
                  "http://pokemon.outofbits.com/ontology#Pokémon"]
                metrics {
                  peer {
                    step = "esm.exploit.sim.peerpressure"
                    weight = 1.0
                  }
                }
              }
              handler = "SimilaritySection",
            }
          }
        }
      }
    }
  }
}

widget treeview {
  type iri {
    pattern {
      "*" {
        perspective _ {
          handler = "ResourceTreeView"
        }
      }
    }
  }
}

widget sparql {
  type iri {
    pattern {
      "*" {
        perspective _ {
          handler = "PrefixLink"
        }
      }
      "http://pokemon.outofbits.com/*" {
        perspective _ {
          precedenceOver = [
            "p:*"]
          handler = "BasicSearchLink"
        }
      }
    }
  }
  type literal datatype _ perspective _ {
    handler = "VerboseLiteral"
  }
}
