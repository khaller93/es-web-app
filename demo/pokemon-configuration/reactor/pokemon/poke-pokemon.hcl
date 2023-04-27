class = "poke:Species"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  property = {
    "poke:hasColor" = {
      priority = 190
      name = {
        en = "Colour"
        de = "Farbe"
      }
      collection = {
        collection_handler = "LanguageAwareCommaSeparatedList"
      }
    }
    "poke:species" = {
      priority = 191
      name = {
        en = "Species"
        de = "Spezie"
      }
      collection = {
        collection_handler = "LanguageAwareCommaSeparatedList"
      }
    }
    "poke:hasPokédexEntry" = {
      priority = 189
      name = {
        en = "Pokédex Entries"
        de = "Pokédex Einträge"
      }
    }
  }

  sections = [
    "artwork_table",
    "related_pokemon"]

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
    }

    artwork_table {
      expand = true
      name {
        en = "Depiction",
        de = "Abbildung",
      }
      hint {
        en = "Artworks of this Pokémon across generations."
        de = " dieses Pokémon "
      }
      neighbourhood {
        include = [
          "http://xmlns.com/foaf/0.1/depiction"]
      }
      sectionHandler = "ProvenanceTableSection",
    }

    related_pokemon {
      expand = true
      name {
        en = "See Also",
        de = "Siehe Auch",
      }
      hint {
        en = "Related Pokémon to the currently viewed one."
        de = "Ähnliche Pokémon zum aktuellen."
      }
      config {
        number = 4
        classes = [
          "poke:Species"]
        excludedClasses = [
          "http://xmlns.com/foaf/0.1/Image"]
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
}
