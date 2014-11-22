/**
 * @package
 * @author    MoYuQi(zhe.moyuqi[at]gmail.com)
 * @link    https://github.com/moyuqi/jquery.randomnum
 * @version  0.1.20130607
 * @build    2013-06-07
 * @license        MIT License
 */
(function ($) {
    $.fn.randomNum = function (config) {
        var thisObj = this;
        var options = $.extend({
            count: 6,
            startRandomObj: null, //开始按钮
            overRandomOjb: null,  //结束按钮
            callback: function () {  //
            }
        }, config);

        //初始化
        init(thisObj, options.count);
        //绑定事件
        if (options.startRandomObj) {
            options.startRandomObj.unbind('click').bind('click', function () {
                getRandomNum(thisObj, options.count);//随机数动画
            });
        }
        if (options.overRandomOjb) {
            options.overRandomOjb.unbind('click').bind('click', function () {
                clearRandom();
            });
        }
        return this;
    };

    var T;

    /**
     *   初始化
     * @param elem   容器
     * @param count  随机数位数
     */
    var init = function (elem, count) {
        elem.addClass('randomNumHolder').empty();
        for (var i = 0; i < count; i++) {
            $('<span class="position"><span class="digit static" style="top: 0px; opacity: 1;">0</span></span>').appendTo(elem);
        }
        elem.attr("init", true);
    };


    /**
     *   改变随机数
     * @param position   定位
     * @param number 数值
     * @return {boolean}
     */
    var switchDigit = function (position, number) {
        var digit = position.find('.digit');
        /*console.log(digit.is(':animated'));
         if (digit.is(':animated')) {
         return false;
         }*/
        if (position.data('digit') == number) {
            // We are already showing this number
            return false;
        }
        position.data('digit', number);
        var replacement = $('<span>', {
            'class': 'digit',
            css: {
                top: '-2.1em',
                opacity: 0
            },
            html: number
        });

        digit
            .before(replacement)
            .removeClass('static')
            .animate({top: '2.5em', opacity: 0}, 'fast', function () {
                digit.remove();
            });

        replacement
            .delay(100)
            .animate({top: 0, opacity: 1}, 'fast', function () {
                replacement.addClass('static');
            });
    };

    //生成随机数
    var getRandomNum = function (elem, count) {
        var positions = elem.find('.position');
        for (var i = 0; i < count; i++) {
            var num = Math.floor(Math.random() * 10);
            switchDigit(positions.eq(i), num);
        }

        T = setTimeout(getRandomNum, 500);
    };

    //清除随机数事件
    var clearRandom = function () {
        clearTimeout(T);
    };
})(jQuery);
