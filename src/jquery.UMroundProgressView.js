var instanceCount = 0;

(function($) {
    $.fn.UMroundProgressView = function(options) {

      var ctx;
      var $this = this;
      var currentAmount;
      var settings = $.extend({
        color: "#00D11B",
        size: "100",
        initialValue: "0.0",
        thickness: "20"
      }, options);

      var methods = {
        getRadians: function(percentage) {
          degrees = percentage * 360.0 + 90;
          return degrees * Math.PI / 180.0;
        },
        drawBackground: function() {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.shadowColor = 'rgba(0,0,0,0.0)';
          ctx.beginPath();
          ctx.arc(settings.size/2, settings.size/2, settings.size/2 - 5, 0, methods.getRadians(1), false);
          ctx.closePath();
          ctx.fillStyle = '#dddddd';
          ctx.fill();
        },
        drawPie: function(amount) {
          currentAmount = amount;
          ctx.beginPath();
          ctx.moveTo(settings.size/2, settings.size/2);
          ctx.lineTo(settings.size/2, settings.size);
          ctx.arc(settings.size/2, settings.size/2, settings.size/2-5, 0.5 * Math.PI, methods.getRadians(amount), false);
          ctx.lineTo(settings.size/2, settings.size/2);
          ctx.closePath();
          ctx.fillStyle = settings.color;
          ctx.fill();
        },
        drawPlate: function() {
          ctx.beginPath();
          ctx.moveTo(settings.size/2, settings.size/2);
          ctx.arc(settings.size/2, settings.size/2, settings.size/2 - settings.thickness, 0, methods.getRadians(1), false);
          ctx.closePath();
          ctx.shadowOffsetY = 1;
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 1;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 1;
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.fillStyle = '#444444';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = (settings.size - settings.thickness)*0.25+"px helvetica";
          ctx.fillText(Math.round(currentAmount * 100) + "%", settings.size/2, settings.size/2);
        },
        init: function() {
          instanceCount = instanceCount + 1;
          $this.html("<canvas width='"+settings.size+"px' height='"+settings.size+"px' id='UMProgressView_"+instanceCount+"'></canvas>");
          canvasID =  $this.children('canvas').attr('id');
          ctx = document.getElementById(canvasID).getContext("2d");
          methods.drawBackground();
          methods.drawPie(settings.initialValue);
          methods.drawPlate();
       }
}

       var setValue = function(amount) {
          methods.drawBackground();
          methods.drawPie(amount);
          methods.drawPlate();
       }

        methods.init();
        return { setValue : setValue }
      }

}(jQuery));