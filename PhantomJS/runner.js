var HTMLCS_RUNNER = new function() {
    this.run = function(standard, sourceFile) {
        var self = this;

        // At the moment, it passes the whole DOM document.
        HTMLCS.process(standard, document, function() {
            var messages = HTMLCS.getMessages();
            var length   = messages.length;
            for (var i = 0; i < length; i++) {
                self.output(messages[i], sourceFile);
            }

            console.log('done');
        });
    };

    this.output = function(msg, sourceFile) {
        // Simple output for now.
        var typeName = 'UNKNOWN';
        switch (msg.type) {
            case HTMLCS.ERROR:
                typeName = 'ERROR';
            break;

            case HTMLCS.WARNING:
                typeName = 'WARNING';
            break;

            case HTMLCS.NOTICE:
                typeName = 'NOTICE';
            break;
        }//end switch

        var elementString = [];
        elementString.push(msg.element.nodeName);
        for(var i=0; i<msg.element.attributes.length; i++ ) {
          if ( msg.element.attributes.item(i) ) {
            elementString.push(msg.element.attributes.item(i).nodeName + ": " + msg.element.attributes.item(i).nodeValue);
          }
        }

        console.log(sourceFile + '|' + elementString.join(' ') + '|' + typeName + '|' + msg.code + '|' + msg.msg);

    };

};