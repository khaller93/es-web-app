class = "poke:Species"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  sections = [
    "img_table",
    "similar"]

  section __main__ {
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
        "poke:describedInPokédex",]
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

  section img_table {
    expand = false
    name {
      en = "Depiction",
      de = "Abbildung",
    }
    neighbourhood {
      include = [
        "http://xmlns.com/foaf/0.1/depiction"]
    }
    sectionHandler = "ProvenanceTableSection",
  }

  section similar {
    expand = true
    name {
      en = "See Also",
      de = "Siehe Auch",
    }
    config {
      number = 4,
      classes = [
        "poke:Species"]
      ranking {
        peer {
          step = "esm.exploit.sim.ldsd"
          weight = 1.0
        }
      }
    }
    sectionHandler = "SimilaritySection",
  }

}

