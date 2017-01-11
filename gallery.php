<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="cs"> <!--<![endif]-->
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Bunkr Drnov</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="./bower_components/foundation/css/normalize.css" />
        <link rel="stylesheet" href="./bower_components/foundation/css/foundation.min.css" />
        <link rel="stylesheet" media="screen,projection,tv" href="./css/main.css" type="text/css" />
        <link rel="stylesheet" media="screen,projection,tv" href="./css/lightbox.css" type="text/css" />
        <link href='http://fonts.googleapis.com/css?family=Exo+2&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
        <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">
        <link rel="icon" type="image/png" href="/favicon-160x160.png" sizes="160x160">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">        
        <meta name="msapplication-TileColor" content="#ffc40d">
        <meta name="msapplication-TileImage" content="/mstile-144x144.png">        
        <script src="./bower_components/modernizr/modernizr.js"></script>
        <script src="./bower_components/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="http://api4.mapy.cz/loader.js"></script>
        <script type="text/javascript">Loader.load();</script>        
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-23003382-1']);
            _gaq.push(['_trackPageview']);
            (function() {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        </script>
        <style type="text/css">
            body {
                margin-top:0;
                padding-top:30px;
            }
            .padded {
                margin:30px;
                border:2px solid #34622f;
            }
        </style>
    </head>
    <body class="">
        <div class="container">
            <div class="row">
                <nav class="large-2 small-12 columns">
                    <ul>
                        <li class="logo" style="margin-top:0;"><h1><a href="javascript:void(0)"><span>Bunkr Drnov</span></a></h1></li>
                        <li class="item">
                            <a href="index.html" class="scroll">Bunkr Drnov</a>
                        </li>
                    </ul>
                </nav>
                <div class="large-10 small-12 columns">
                    <div class="content">
                        <section class="">
                            <?php
                                $path = 'images/pr/';
                                $files = array('DSC_8043.JPG', 'DSC_5803.JPG', 'DSC_5806.JPG', 'DSC_5807.JPG', 'DSC_5816.JPG', 'DSC_5856.JPG', 'DSC_5859.JPG', 'DSC_5907.JPG', 'uran.jpg', 'zazraky-prirody-1.jpg');
                                foreach ($files as $file) {
                                    echo '<a href="'.$path.$file.'" data-lightbox="images" data-title="Bunkr Drnov"><img class="padded image" src="'.$path.$file.'" width="300"></a>';
                                }
                            ?>
                        </section>
                        <section>
                            Pokračujte na <a href="index.html">webové stránky Bunkru Drnov</a>.
                        </section>
                    </div>
                <footer class="footer">
                    Vyrobeno v Bunkru Drnov
                    <script src="js/script.js"></script>
                    <script src="js/jquery-1.11.0.min.js"></script>
                    <script src="js/lightbox.min.js"></script>
                </footer>
                </div>
            </div>
        </div>
    </body>
</html>