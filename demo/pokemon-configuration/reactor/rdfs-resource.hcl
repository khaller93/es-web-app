/*
  CLASS

  the IRI of the class to which this configuration
  shall be applied.
*/
class = "rdfs:Resource"

/*
  EXTENSION

  a list of classes represented with their IRI from
  which this configuration is inheriting.
*/
extends = []


/*
   INFOBOX WIDGET CONFIGURATION

*/
widget infobox perspective _ {

  property = {
    "rdfs:seeAlso" = {

      name = {
        en = "See Also"
        de = "Siehe Auch"
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

      property_handler = {
        type = "BasicPredicate"
      }

    }
    "poke:hasType" = {
      priority = 200
      name = {
        en = "Type"
        de = "Typ"
      }
    }
  }

  /*
     SECTIONS

     specifies a list of sections that shall be rendered for this
     match (rdfs:Resource instances). __main__ is the default
     section at the top. It is always rendered and will be added
     automatically as the first entry in the section list. Custom
     sections like 'related' below shall be added to the sections list.
  */
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

      /*
         SECTION SPECIFIC CONFIGURATION

         configurations that are specific to this section and
         and its used handler. The section handler might expect
         certain properties to be passed in order to function
         correctly.
      */
      config {
        /*
           DESCRIPTION

           the properties specified for fetching the descrption
           of an entity. it can be a property or a property chain
           as it can be defined in SPARQL (https://www.w3.org/TR/sparql11-property-paths/).
        */
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
      /*
         SECTION HANDLER

         handler that shall be used for rendering this section.
         configuration for the handler can be passed with the
         'config' key. A similarity section for example, expects
         a configuration for ranking metrics that shall be used.
      */
      sectionHandler = "SimilaritySection"
      /*
         NAME

         an optional short name of this section.
      */
      name {
        en = "Related Entities"
        de = "Ähnliches"
      }
      /*
         HINT

         an optional human friendly description of this section.
      */
      hint {
        en = "Related entities to the currently viewed one."
        de = "Ähnliche Resourcen zu der aktuell an "
      }
      /*
         EXPAND

         sections are per default collapsed and the user has to expand
         them to vie the content. However, this behaviour can be changed
         with this key.
      */
      expand = true
      /*
        SECTION SPECIFIC CONFIGURATION

        see __main__ for comments
     */
      config {
        number = 4
        excludedClasses = [
          "http://xmlns.com/foaf/0.1/Image"]
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

/*
   SPARQL WIDGET CONFIGURATION

*/
widget sparql perspective _ {
  type iri {
    type = "PrefixLink"
  }
  type literal {
    type = "VerboseLiteral"
  }
}