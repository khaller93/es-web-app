class = "rdfs:Class"

extends = [
  "rdfs:Resource"]

widget infobox perspective _ {

  property = {
    "rdfs:subClassOf" = {
      name = {
        en = "Parent Class",
        de = "Basisklasse"
      }
    }
  }

  sections = [
    "class_sample",
    "related_classes"]

  section {

    class_sample {
      sectionHandler = "ClassSampleSection"
      name {
        en = "Examples"
        de = "Beispiele"
      }
      hint {
        en = "A ramdom sample of instances of given class."
        de = "Ein zufälliger Auschnitt von Instanzen der gegebenen Klasse."
      }
      expand = true
      config {
        number = 8
      }
    }

    related_classes {
      sectionHandler = "SimilaritySection"
      name {
        en = "Related Classes"
        de = "Ähnliche Klassen"
      }
      hint {
        en = "Related classes to the currently viewed one."
        de = "Ähnliche Klassen zu der aktuellen angesehenen."
      }
      expand = true
      config {
        number = 4
        classes = [
          "http://www.w3.org/2000/01/rdf-schema#Class"]
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