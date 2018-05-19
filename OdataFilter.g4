grammar OdataFilter;

options {
    language=Java;
}
@header {
package com.sn.framework.core.odata.antlr;
}

odataFilter: criteriaExpression;

criteriaExpression: (criteriaIterm) (('OR'|'or') criteriaIterm)*
;
criteriaIterm: (criteriaFactor) (('AND'|'and') criteriaFactor)*
;

criteriaFactor: simpleCriteria
            | '(' criteriaExpression ')'
;
simpleCriteria: criteriaLike
            | criteriaEndswith
            | criteriaStartswith
            | criteriaNotLike
            | criteriaOther
;

criteriaLike: ('substringof('|'contains(') value ',' field ')'
;

criteriaEndswith: 'endswith(' value ',' field ')'
;

criteriaStartswith: 'startswith(' value ',' field ')'
;

criteriaNotLike: 'indexof(' field ',' value ') eq -1'
;

criteriaOther: field operate value
;

field: WORD;

operate: 'eq'|'ne'|'gt'|'ge'|'lt'|'le'|'ni'|'in'|'endswith'|'startswith'
;

value: STRING
    | NUMBER
    | DATATIME
    | 'true' | 'false'
    | 'null'
;

WORD: ([a-zA-Z0-9_./+])+ ;

DATATIME: ('datetime\'' (~ '\'')+ '\'') ;

STRING: ('\'' (~ '\'')* '\'') ;

NUMBER
   : '-'? INT '.' [0-9] + EXP? | '-'? INT EXP | '-'? INT
;
fragment INT : '0' | [1-9] [0-9]* ;

// no leading zeros
fragment EXP : [Ee] [+\-]? INT ;

// \- since - means "range" inside [...]
WS
  : [ \t\n\r,] + -> skip
  ;