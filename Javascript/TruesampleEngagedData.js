<script type='text/javascript'>		//This is necessary, because this script gets added to the header of a survey
Qualtrics.SurveyEngine.addOnload(function () {
    var ts_override = parseInt("${e://Field/ts_override}");
    var questions = document.getElementsByClassName('QuestionOuter');
    if (ts_override != 1 && typeof questions[0] !== "undefined") {
        var pageStart = new Date();
        var beginning = pageStart.getTime();
        // Necessary Variables
        var parameters = [];
        parameters['account-id'] = "${e://Field/account-id}";
        parameters['passcode'] = "${e://Field/passcode}";
        parameters['survey-country'] = "${e://Field/survey-country}";
        parameters['end-client-id'] = "${e://Field/end-client-id}";
        parameters['platform-id'] = "${e://Field/platform-id}";
        parameters['respondent-id'] = "${e://Field/respondent-id}";
        parameters['response-id'] = "${e://Field/response-id}";
        parameters['source_id'] = "${e://Field/source-id}";
        parameters['survey-id'] = "${e://Field/survey-id}";
        parameters['api-version'] = "${e://Field/api-version}";
        var qid = /(\d+)/.exec(questions[0].id);
        parameters['page-id'] = qid[1] * 100 + parseInt("${lm://CurrentLoopNumber}");
        //End Variables
        var that = this;
        that.hideNextButton();
        var para = document.createElement("footnote");
        var test = document.getElementById("Buttons");
        var node = document.createElement('input');
        var next = document.getElementById("NextButton");
        node.id = "tsButton";
        node.type = "button";
        node.name = "tsButton";
        node.value = "  >>  ";
        node.onclick = function trueSample() {
            var pageEnd = new Date();
            var end = pageEnd.getTime();
            parameters['page-exposure-duration'] = end - beginning;
            //window.alert(parameters['page-id'] + ", time spent on page = " + parameters['page-exposure-duration']);

            function crossDomainPost() {
                // Add the iframe with a unique name
                var iframe = document.createElement("iframe");
                var uniqueString = "c0Mplete";
                document.body.appendChild(iframe);
                iframe.style.display = "none";
                iframe.contentWindow.name = uniqueString;

                // construct a form with hidden inputs, targeting the iframe
                var form = document.createElement("form");
                form.target = uniqueString;
                form.action = "https://survey.api.truesample.net/engaged-data-collection";
                form.method = "POST";

                // add parameter fields to form
                for (var key in parameters) {
                    var input1 = document.createElement("input");
                    input1.type = "hidden";
                    input1.name = key;
                    input1.value = parameters[key];
                    form.appendChild(input1);
                }
                document.body.appendChild(form);
                form.submit();
            }
            crossDomainPost();
            that.clickNextButton();
        };
        para.appendChild(node);
        test.insertBefore(para, next);
    }
});
</script>