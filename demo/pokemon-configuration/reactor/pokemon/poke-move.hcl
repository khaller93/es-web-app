class = "poke:Move"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  property = {
    "poke:effectDescription" {
      name = {
        en = "Effect Description"
        de = "Beschreibung des Effekts"
      }
      collection = {
        collection_handler = "LanguageAwareCommaSeparatedList"
      }
    }
  }

  sections = [
    "related_move"]

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
          "poke:effectDescription"]
      }
    }

    related_move {
      expand = true
      name {
        en = "Related Moves",
        de = "Ähnliche Aktionen",
      }
      hint {
        en = "Related moves to the currently viewed one."
        de = "Ähnliche Aktionen zum aktuellen."
      }
      config {
        number = 4
        classes = [
          "poke:Move"]
        excludedClasses = [
          "http://xmlns.com/foaf/0.1/Image"]
        ranking {
          peer {
            step = "esm.exploit.sim.ldsd"
            weight = 1.0
          }
        }
      }
      sectionHandler = "SimilaritySection"
    }
  }
}
