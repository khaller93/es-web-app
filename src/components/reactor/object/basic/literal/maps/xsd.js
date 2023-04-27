import TextLiteral from "../default/TextLiteral";
import ExternalLinkLiteral from "../default/ExternalLinkLiteral";
import BooleanLiteral from "../default/BooleanLiteral";
import NumberLiteral from "../default/NumberLiteral";
import TimeLiteral from "../default/TimeLiteral";
import DateLiteral from "../default/DateLiteral";

export default {
    'http://www.w3.org/2001/XMLSchema#string': TextLiteral,
    'http://www.w3.org/2001/XMLSchema#anyURI': ExternalLinkLiteral,
    'http://www.w3.org/2001/XMLSchema#boolean': BooleanLiteral,
    'http://www.w3.org/2001/XMLSchema#decimal': NumberLiteral('decimal'),
    'http://www.w3.org/2001/XMLSchema#integer': NumberLiteral('integer'),
    /* decimal, float, double */
    'http://www.w3.org/2001/XMLSchema#long': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#int': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#short': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#byte': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#nonPositiveInteger': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#nonNegativeInteger': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#positiveInteger': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#unsignedLong': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#unsignedInt': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#unsignedShort': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#unsignedByte': NumberLiteral('integer'),
    'http://www.w3.org/2001/XMLSchema#float': NumberLiteral('decimal'),
    'http://www.w3.org/2001/XMLSchema#double': NumberLiteral('decimal'),
    /* date, time, datetime */
    'http://www.w3.org/2001/XMLSchema#dateTime': TimeLiteral,
    'http://www.w3.org/2001/XMLSchema#time': TimeLiteral,
    'http://www.w3.org/2001/XMLSchema#date': DateLiteral,
}