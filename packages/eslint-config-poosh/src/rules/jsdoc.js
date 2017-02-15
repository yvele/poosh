export default {
  rules : {
    // Ensure JSDoc comments are valid
    // http://eslint.org/docs/rules/valid-jsdoc
    "valid-jsdoc" : ["error", {
      requireReturn             : false,
      requireReturnType         : false,
      requireParamDescription   : false,
      requireReturnDescription  : false,
      prefer : {
        virtual       : "abstract",
        extends       : "augments",
        constructor   : "class",
        constant      : "const",
        defaultvalue  : "default",
        desc          : "description",
        host          : "external",
        fileoverview  : "file",
        overview      : "file",
        emits         : "fires",
        func          : "function",
        method        : "function",
        var           : "member",
        arg           : "param",
        argument      : "param",
        prop          : "property",
        return        : "returns",
        exception     : "throws",
        linkcode      : "link",
        linkplain     : "link"
      },
      preferType : {
        String  : "string",
        object  : "Object",
        Number  : "number",
        Boolean : "boolean"
      }
    }]
  }
};
