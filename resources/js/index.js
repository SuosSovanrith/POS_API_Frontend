// Get all page data
function CartView(){
    var user_id = $("#user_id").val();
    fetch("http://127.0.0.1:8000/api/cart", {
        method: "POST",
        withCredentials: true,
        headers: {
        "api_key": "123456",
        "Content-Type": "application/json",
        'user_id': user_id
        }})
    
    .then((data)=>{
        return data.json();
    })
    .then((objectData)=>{
        console.log(objectData);

        if(objectData.status == 403){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: objectData.message,
              });
        }

        if(objectData.status == 200){

            // Customer data
            var customerData = "";
            $.each(objectData.customer, function(index, item) {
                customerData += '<option value="' + item.customer_id + '" >' + item.customer_name + '</option>';
            });

            // Product data
            var productData = "";
            $.each(objectData.products, function(index, item) {
                productData += '<div class="col-md-3 col-lg-2 position-relative">';

                if(item.quantity > 0){
                    productData += '<span class="position-absolute top-0 end translate-middle badge rounded-pill bg-danger"  style="z-index:2;">' + item.quantity + '</span>';
                }

                productData += '<div class="card-style-2 mb-30 position-relative px-0">' ;

                if(item.quantity == 0){
                    productData += '<span class="position-absolute bottom-50 text-center" style="background-color: rgba(255, 255, 255, 0.7);"><h4 class="text-danger">Out of Stock</h4></span>';
                }

                productData += '<div class="card-image">';
                
                if(item.quantity == 0){
                    productData += '<a href="#" class="AddCartImage" style="pointer-events: none">';
                }else{
                    productData += '<a href="#" class="AddCartImage">';
                }
                
                productData += '<input type="hidden" class="Product_Id" value="' + item.product_id + '"/>';
                productData += '<img src="../../public/' + item.image + '" alt="Product Image">  </a> </div>' ;
                productData += '<div class="card-content"><h5 align="center">' + item.product_name + '</h5> </div></div></div>';

            });

            // Cart data
            var cartData = "";
            var total = 0, cart_item = 0;
            $.each(objectData.cart, function(index, item) {
                cartData += '<tr><td class="min-width p-3"><img src="../../public/'+ item.image +'" width="60" style="display:inline;"><p style="display:inline;"> ' + item.product_name + '</p></td>';
                cartData += '<td class="min-width p-3"> <input type="number" class="form-control Cart_Quantity" min="0" name="Cart_Quantity" id="Cart_Quantity" value="' + item.cart_quantity + '" style="max-width: 52px; display:inline;">';
                cartData += '<p style="display: none;">' + item.cart_id + '</p>';
                cartData += '<button class="BtnDeleteCart text-danger" style="width: 16px; background:transparent; border-style:none; display:inline;"><i class="lni lni-trash-can"></i></button> </td>'; 
                cartData += '<td class="min-width p-3"><p> $' + (item.price_out * item.cart_quantity).toFixed(2) + '</p></td></tr>'; 
                total += item.price_out * item.cart_quantity;
                cart_item += 1;
            });


            $("#Customer_Id").html(customerData); 
            $("#Product_List").html(productData); 
            $("#Cart_Content").html(cartData); 
            $("#TotalAmount").val(total);
            $("#SubTotal").html("$" + total.toFixed(2)); 
            $("#Total_Discount").html("$" + total.toFixed(2)); 

            if(cart_item == 0){
                $('.BtnClearCart').prop( "disabled", true );
                $('.BtnSubmitOrder').prop( "disabled", true );

            }else{
                $('.BtnClearCart').prop( "disabled", false );
                $('.BtnSubmitOrder').prop( "disabled", false );
            }
        }
     });
}

// Load everything 
$( document ).ready(function() {
    CartView();
});

    
// for add cart
$('#ScanBarcode').keypress(function (e) {
    if (e.which == 13) {
        var Barcode = $("#ScanBarcode").val();
        var user_id = $("#user_id").val();

        fetch("http://127.0.0.1:8000/api/addcart", {
            method: "POST",
            withCredentials: true,
            headers: {
            "api_key": "123456",
            "Content-Type": "application/json",
            "Barcode": Barcode,
            "user_id": user_id
            }})
        
        .then((data)=>{
            return data.json();
        })
        .then((objectData)=>{
            console.log(objectData);
    
            if(objectData.status == 403 || objectData.status == 400 || objectData.status == 412){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: objectData.message,
                  });
            }
    
            if(objectData.status == 200){
                CartView();
                setTimeout(() => {
                    Calculate_Discount();
                }, 1000);
            }
         });
    }
});
    
// for add cart image
$('#Product_List').on('click', '.AddCartImage', function() {
    var user_id = $("#user_id").val();
    var Product_id = $(this).find('.Product_Id').val();
    
    fetch("http://127.0.0.1:8000/api/addcartimage", {
        method: "POST",
        withCredentials: true,
        headers: {
        "api_key": "123456",
        "Content-Type": "application/json",
        "Product_id": Product_id,
        "user_id": user_id
        }})
    
    .then((data)=>{
        return data.json();
    })
    .then((objectData)=>{
        console.log(objectData);

        if(objectData.status == 403 || objectData.status == 400 || objectData.status == 412){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: objectData.message,
              });
        }

        if(objectData.status == 200){
            CartView();
            setTimeout(() => {
                Calculate_Discount();
            }, 1000);
        }
     });
});


// for calculate discount
function Calculate_Discount(){
    var discount = $('#Discount').val();
    var total = $("#TotalAmount").val();
    var after = total * (1-(discount/100));

    $("#Total_Discount").html("$" + parseFloat(after).toFixed(2));
}

$('#Discount').focusout(function () {
    Calculate_Discount();
});

// for delete cart
$('#Cart_Content').on('click', '.BtnDeleteCart', function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete Item!"
      }).then((result) => {
        if (result.isConfirmed) {
            var current_row = $(this).closest('tr');
            var Cart_Id = current_row.find('td').eq(1).text().trim();

            fetch("http://127.0.0.1:8000/api/deletecart", {
                method: "POST",
                withCredentials: true,
                headers: {
                "api_key": "123456",
                "Content-Type": "application/json",
                "Cart_Id": Cart_Id
                }})
            
            .then((data)=>{
                return data.json();
            })
            .then((objectData)=>{
                console.log(objectData);
        
                if(objectData.status == 403){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: objectData.message,
                      });
                }
        
                if(objectData.status == 200){
                    CartView();
                    setTimeout(() => {
                        Calculate_Discount();
                    }, 1000);

                    Swal.fire({
                        title: "Deleted!",
                        text: objectData.message,
                        icon: "success"
                    });
                }
             });

        }
      });
    
});

$(".BtnClearCart").click(function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Clear Cart!"
      }).then((result) => {
        if (result.isConfirmed) {

            var user_id = $("#user_id").val();

            fetch("http://127.0.0.1:8000/api/clearcart", {
                method: "POST",
                withCredentials: true,
                headers: {
                "api_key": "123456",
                "Content-Type": "application/json",
                "user_id": user_id,
                }})
            
            .then((data)=>{
                return data.json();
            })
            .then((objectData)=>{
                console.log(objectData);
        
                if(objectData.status == 403){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: objectData.message,
                    });
                }
        
                if(objectData.status == 200){
                    CartView();
                    setTimeout(() => {
                        Calculate_Discount();
                    }, 1000);

                    Swal.fire({
                        title: "Cleared!",
                        text: objectData.message,
                        icon: "success"
                    });
                }
             });

        }
      });
});


// for update quantity
$('#Cart_Content').on('focusin', '.Cart_Quantity', function() {
    var Cart_Quantity = $(this).val();

    $('#Cart_Content').on('focusout', '.Cart_Quantity', function() {
        $(this).val(Cart_Quantity)
    });
});

$('#Cart_Content').on('keypress', '.Cart_Quantity', function(e) {
    if (e.which == 13) {
        var Cart_Quantity = $(this).val();
        var current_row = $(this).closest('tr');
        var Cart_Id = current_row.find('td').eq(1).text().trim();

        fetch("http://127.0.0.1:8000/api/updatecartquantity", {
            method: "POST",
            withCredentials: true,
            headers: {
            "api_key": "123456",
            "Content-Type": "application/json",
            "Cart_Quantity": Cart_Quantity,
            "Cart_Id": Cart_Id
            }})
        
        .then((data)=>{
            return data.json();
        })
        .then((objectData)=>{
            console.log(objectData);
    
            if(objectData.status == 403 || objectData.status == 400 || objectData.status == 412){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: objectData.message,
                  });
            }
    
            if(objectData.status == 200){
                CartView();
                setTimeout(() => {
                    Calculate_Discount();
                }, 1000);
            }
         });
    }
});


// for search product
$('#Product_Search').keypress(function () {
    console.log($('#Product_Search').val());
    fetch("http://127.0.0.1:8000/api/searchproduct", {
        method: "POST",
        withCredentials: true,
        headers: {
        "api_key": "123456",
        "Content-Type": "application/json",
        "Search": $('#Product_Search').val(),
        }})
    
    .then((data)=>{
        return data.json();
    })
    .then((objectData)=>{
        console.log(objectData);

        if(objectData.status == 403){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: objectData.message,
              });
        }

        if(objectData.status == 200){
            // Product data
            var productData = "";
            $.each(objectData.products, function(index, item) {
                productData += '<div class="col-md-3 col-lg-2 position-relative">';

                if(item.quantity > 0){
                    productData += '<span class="position-absolute top-0 end translate-middle badge rounded-pill bg-danger"  style="z-index:2;">' + item.quantity + '</span>';
                }

                productData += '<div class="card-style-2 mb-30 position-relative px-0">' ;

                if(item.quantity == 0){
                    productData += '<span class="position-absolute bottom-50 text-center" style="background-color: rgba(255, 255, 255, 0.7);"><h4 class="text-danger">Out of Stock</h4></span>';
                }

                productData += '<div class="card-image" >';
                productData += '<input type="hidden" id="Product_Id" value="' + item.product_id + '"/>';
                
                if(item.quantity == 0){
                    productData += '<a href="#" id="AddCartImage" style="pointer-events: none">';
                }else{
                    productData += '<a href="#" id="AddCartImage">';
                }

                productData += '<img src="../../public/' + item.image + '" alt="Product Image">  </a> </div>' ;
                productData += '<div class="card-content"><h5 align="center">' + item.product_name + '</h5> </div></div></div>';
                $("#Product_List").html(productData); 

            });
        }
     });

    
    // for add order
    $(".BtnSubmitOrder").click(function() {
        if( $('input[name="Payment"]:checked').val() == 0){
            Swal.fire({
                title: "Enter Recieved Amount",
                html:
                    '<b>Amounts($):</b> <input id="swal-input1" class="swal2-input" min="0" step="0.01" value="' + ($('#TotalAmount').val() * (1-($('#Discount').val()/100))) + '"  />',
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    var customer_id = $('#Customer_Id').val();
                    var amount = $('#swal-input1').val();
                    var discount = $('#Discount').val();
                    var payment_method = $('input[name="Payment"]:checked').val();

                    $.post('/addorder', {
                        customer_id: customer_id,
                        amount: amount,
                        discount: discount,
                        payment_method: payment_method

                    }, function(data) {
                        window.location.href = "/admin/order";
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                }
                });
        }else{
            Swal.fire({
                title: "Enter Recieved Amount and KHQR",
                html:
                    '<b>Amounts($):</b> <input type="number" id="swal-input1" class="swal2-input" min="0" step="0.01" value="' + ($('#TotalAmount').val() * (1-($('#Discount').val()/100))) + '"  required/> <br/>' +
                    '<img src="http://127.0.0.1:8000/assets/images/payment/abaQr.jpg" width="180"> <br/>' +
                    '<b>KHQR:</b> <input type="file" id="swal-input2" class="swal2-file" accept="image/*" required>',
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    var customer_id = $('#Customer_Id').val();
                    var amount = $('#swal-input1').val();
                    var discount = $('#Discount').val();
                    var payment_method = $('input[name="Payment"]:checked').val();
                    var khqr = $('#swal-input2').val().split('\\').pop();;

                    $.post('/addorder', {
                        customer_id: customer_id,
                        amount: amount,
                        discount: discount,
                        payment_method: payment_method,
                        khqr: khqr

                    }, function(data) {
                        window.location.href = "/admin/order";
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                }
                });
        }
    });
        
});