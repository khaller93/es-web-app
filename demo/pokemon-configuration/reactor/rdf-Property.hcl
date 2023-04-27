class = "rdf:Property"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  sections = [
    "related_properties"]

  section {

    related_properties {
      sectionHandler = "SimilaritySection"
      name {
        en = "Related Properties"
        de = "Ähnliche Eigenschaften"
      }
      hint {
        en = "Related properties to the currently viewed one."
        de = "Ähnliche Eigenschaften, die auch interessant sein könnten."
      }
      expand = true
      config {
        number = 4
        classes = [
          "rdf:Property"]
        ranking {
          peer {
            step = "esm.exploit.sim.peerpressure"
            weight = 1.0
          }
        }
      }
    }
  }
}