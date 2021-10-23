<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="My Rules - The javascript form validation">
    <meta name="Keywords" content="My Rules, My Rules Validation, My Rules Validation Form, Get My Rules,Get myrules,Get myrules.js, Form Validation, Javascript form validation, myrules.js, Download My Rules, Download myrules.js">
    <meta name="author" content="Alberto Jordane Adolfo">
    <link rel="icon" href="assets/img/favicon.png" type="image/x-icon">

    <link rel="stylesheet" href="assets/vendor/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="assets/vendor/w3/w3.css">
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/codepanel.css">

    <title>My Rules - Javascript form validation</title>
</head>
<body>

<div id="include-header" navactive="nav-home"></div>

<main role="main">
    <section class="pb-1  mt-5">
        <div class="container">
            <div class="jumbotron w3-center">
                <h1 class="mb-4">My Rules. Your form, your rules...</h1>
                <p class="lead">My Rules is a small  javascript library that allow you to validate your web site forms.</p>
                <p class="lead">My Rules is easy to lean, and easy to use. It speeds up and simplifies web development.</p>
                <a href="getting-started.html" id="get-started" class=" btn btn-lg btn-outline-success mt-3 mr-1"><i class="fas fa-book"></i>
                    Get Started</a>
                <a href="#" class=" btn btn-lg btn-outline-secondary mt-3 mr-1"><i class="fas fa-download"></i>
                    Download</a>
            </div>
        </div>
    </section>
    <section id="sec-installation" class="bg-light-grey mt-4">
        <div class="container pt-4 pb-5">
            <h1>Using My Rules</h1>
            <h2 class="w3-xlarge">Include from CDN</h2>
            <p>To Include My Rules in your web site from CDN, just add a script in your page.</p>
            <div class="code-panel  pt-0 pb-0">
                <code class="lang-html">
                    <pre><i class="tag">&lt;script</i> <i class="attr">src=</i><i class="value">"http://exemplo.cdn/myrules.min.js"</i><i class="tag">&gt;</i><i class="tag">&lt;script/&gt;</i></pre>
                </code>
            </div>

            <h2 class="w3-xlarge mt-5">Download and Host Youself</h2>
            <p>To host yourself, download <a href="" class="underline">My Rules here</a> and add a script in your web page.</p>
            <div class="code-panel  pt-0 pb-0">
                <code class="lang-html">
                    <pre><i class="tag">&lt;script</i> <i class="attr">src=</i><i class="value">"myrules.min.js"</i><i class="tag">&gt;</i><i class="tag">&lt;script/&gt;</i></pre>
                </code>
            </div>
            <a href="getting-started.html" class="mt-3 btn btn-outline-success before-arrow"><span>Documentation</span></a>
        </div>
    </section>
</main>

<div id="include-footer"></div>

<script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
<script src="assets/vendor/popper/popper.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>


<script>
    $(function()
    {
        $("#include-header").load("./header.html");
        $("#include-footer").load("./footer.html");
    });
</script>
</body>
</html>