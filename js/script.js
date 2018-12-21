
(function($){//функция обертка используется для избежания конфликтов между библиотеками использующими $
    $(function(){//короткий вызов $(document).ready()
        //Функция оставляющая только уникальные данные в массиве
        function unique(arr) {
            var obj = {};

                for (var i = 0; i < arr.length; i++) {
                    var str = arr[i];
                obj[str] = true; // запомнить строку в виде свойства объекта
                }
                return Object.keys(obj);
        }
        //конец
        //поиграем с цветом
        $('.col').click(function(){//слушатель на цвет
            $('.product').removeClass('spiritC');//чистим
            var cvet=$(this).css('background-color');
            //console.log(cvet);
            $('input[class="colo"]').each(function(){
                var cveti='rgb('+$(this).val()+')';
                //console.log(cveti);
                if(cvet!=cveti){
                    $(this).parents('.product').addClass('spiritC');//не будем нарушать работу других фильтров
                }
            });
        });
        //сделаем Brend - autocomplete
        $( function() {
    var availableTags = [];
    $('input[class="br"]').each(function(){//заполним массив brendami
            availableTags.push($(this).val());
        });
    availableTags=unique(availableTags);
    //console.log(availableTags);
    $( "#brands" ).autocomplete({
      source: availableTags
    });
    //добавим фильтр по бренду
    $('#brands').focusout(function(){
    $('.product').removeClass('spiritB');//чистим
    var brendVibran=$("#brands").val();
    //console.log(brendVibran);
    $('.product').each(function(){
        $('input[class="br"]').each(function(){
            var brendEst=$(this).val();
            //console.log(brendEst);
            if(brendVibran!=""){
                if(brendVibran!=brendEst)
                {
                    $(this).parents('.product').addClass('spiritB');//не будем нарушать работу других фильтров
                }
            }
        });
    });
  } );
});
        //сделали
        $('.spin').spinner({min:1});
        $('#speed').selectmenu({width:150});
        var cena=[];//пустой массив для цен
        $('.price').each(function(){//заполним массив ценами убрав лишние буквы
            cena.push(parseInt($(this).text()));
        });
        var max_price=Math.max.apply(Math, cena);//получим максимум
        var min_price=Math.min.apply(Math, cena);//получим минимум
        //console.log(cena);//проверка
        //console.log('max_price : '+max_price+' min_price : '+min_price);
        $( "#slider-range" ).slider({
            range: true,
            min: min_price,
            max: max_price,
            values: [ min_price, max_price ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            //добавить код который будет скрывать товары не входящие в выбранный диапазон цен
            $('.price').each(function(){
                $(this).parents('.product').removeClass('spirit');
                if(parseInt($(this).text())<ui.values[0]||parseInt($(this).text())>ui.values[1])
                {
                    //console.log(parseInt($(this).text())+'<br> ui.values[0] : '+ui.values[0]+'<br> ui.values[1] : '+ui.values[1]);
                    $(this).parents('.product').addClass('spirit');
                }
            });
            }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );







    });

})(jQuery);
