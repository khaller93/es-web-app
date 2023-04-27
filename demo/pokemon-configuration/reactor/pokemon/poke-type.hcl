class = "poke:Type"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  sections = [
    "related_type"]

  section {

    related_type {
      expand = true
      name {
        en = "Related Types",
        de = "Ähnliche Typen",
      }
      hint {
        en = "Other types that may be of interest."
        de = "Andere Typen, die von Interesse sein könnten."
      }
      config {
        number = 4
        classes = [
          "poke:Type"]
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
