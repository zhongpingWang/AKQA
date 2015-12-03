//单例
var Akqa = {};


Akqa.initEvent = function() {

    var $productTable = $("#webSite .productTable");

    $productTable.on({

        keyup: function() {
            var $this = $(this),
                price = $this.val();
            //replace char
            price = price.replace(/[^\d]/g, '');

            if (price > 10) {
                price = 1;
            }

            $this.val(price);

            if (price) {
                Akqa.sumTotal();
            }; 

        },

        blur: function() {
            var $this = $(this),
                price = $this.val();
            if (!price) {
                $this.val(1);
            };
            Akqa.sumTotal();
        }



    }, ".txtPrice").on("click", ".plus", function() {

        Akqa.plusMinus.call(this, Akqa.TotalEmum.PLUS);

    }).on("click", ".minus", function() {

        Akqa.plusMinus.call(this, Akqa.TotalEmum.MINUS);

    }).on("click",".icon-del",function(){
    	if (!confirm('删除确认？')) {
    		return;
    	};
    	$(this).closest('tr').remove();

    	if ($(".productTable tbody tr").length<=1) {
    		$("#webSite .buyNow").addClass("disable").prop("href","javascript:void(0)");
    		$(".productTable tbody tr td").html('null product');
    	};

    	Akqa.sumTotal();

    });
}

//枚举加减
Akqa.TotalEmum = {
    PLUS: "plus",
    MINUS: "minus"
}

//点击加减
Akqa.plusMinus = function(type) {

    var $txtQty = $(this).parent().prev(),
        qty = parseInt($txtQty.val());
    if (qty) {
        if (type == Akqa.TotalEmum.PLUS) {
            qty += 1;
            if (qty > 10) {
                qty = 10;
            };
        } else {
            qty -= 1;
            if (qty < 1) {
                qty = 1;
            };
        }

    } else {
        qty = 1;
    }

    $txtQty.val(qty);
    //计算总价
    Akqa.sumTotal();
}


//计算总价
Akqa.sumTotal = function() {

    var sum = 0,
        $webSite = $("#webSite"),
        $this, singleSum, vat;

    //计算单个价格和总价    
    $("#webSite .txtPrice").each(function() {
        $this = $(this), $tr = $this.closest("tr"),
            singleSum = parseInt($this.val()) * parseFloat($tr.find(".singlePrice").text());
        singleSum = parseFloat(singleSum.toFixed(2));
        $tr.find(".sumPrice").text(singleSum);
        sum += singleSum;
    });

    //vat
    vat = parseFloat((sum * 0.2).toFixed(2));
    //赋值
    $webSite.find(".subTotalSum").text(sum.toFixed(2))
        .end().find(".vatSum").text(vat)
        .end().find(".totalSum").text((sum + vat).toFixed(2));

}


//初始化
Akqa.init = function() {
    Akqa.initEvent();
}
