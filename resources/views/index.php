<?php 
    include("../layouts/head.php");
?>

<body>

    <?php 
        include("../layouts/sidebar.php");
    ?>

    <main class="main-wrapper">

        <?php 
            include("../layouts/header.php");
        ?>

      <!-- ========== section start ========== -->
       <input type="hidden" id="user_id" value="<?=$_SESSION['user_id'];?>">
        <section class="section">
            <div class="container-fluid p-3 pt-5">
                
            <div class="row">
            <!-- Left side -->
            <div class="col-md-6">
                <div class="card-style shadow">
                        <div class="row">
                        <!-- Barcode -->
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="ScanBarcode" id="ScanBarcode" placeholder="Scan Barcode...">
                            </div>
                        <!-- Customer -->
                            <div class="col-md-6">
                                <div class="select-style-1">
                                    <div class="select-position select-sm">
                                        <select name="Customer_Id" id="Customer_Id">
                                            <!-- @foreach ($customer as $item)
                                            <option value="{{$item->customer_id}}" >{{$item->customer_name}}</option>
                                            @endforeach -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <!-- Product List -->
                        <div class="row mb-3">
                            
                            <div class="table-wrapper table-responsive border-bottom">
                                <table class="table table table-hover table-striped" id="TblMain">
                                    <thead>
                                        <tr>
                                            <th class="p-3">Product</th>
                                            <th class="p-3">Quantity</th>
                                            <th class="p-3">Price</th>
                                        </tr>
                                        <!-- end table row-->
                                    </thead>
                                    <tbody id="Cart_Content">
                                        <!-- <?php $total = 0; $cart_item = 0; ?> -->
                                        <!-- @foreach ($cart as $item)
                                            <tr>
                                                <td class="min-width p-3">
                                                    <img src="{{asset($item->image)}}" width="60" style="display:inline;">
                                                    <p  style="display:inline;">{{$item->product_name}}</p>
                                                </td>
                                                <td class="min-width p-3">
                                                    <input type="number" class="form-control Cart_Quantity" min="0" name="Cart_Quantity" id="Cart_Quantity" value="{{$item->cart_quantity}}" style="max-width: 52px; display:inline;">
                                                    <p style="display: none;">{{$item->cart_id}}</p>
                                                    <button class="BtnDeleteCart text-danger" style="width: 16px; background:transparent; border-style:none; display:inline;"><i class="lni lni-trash-can"></i></button>
                                                </td>
                                                <td class="min-width p-3">
                                                    <p>${{number_format($item->price_out * $item->cart_quantity, 2, '.', ',')}}</p>
                                                </td>
                                            </tr>   
                                            <?php $total += $item->price_out * $item->cart_quantity; $cart_item += 1?>
                                            @endforeach -->

                                        <input style="display: none;" id="TotalAmount"/> 
                                        <!-- end table row -->
                                    </tbody>
                                </table>
                                <!-- end table -->
                            </div>
                        </div>
                        <!-- End Product List -->

                        <!-- Discount-->
                        <div class="row mb-3">
                            <!-- SubTotal / Btn-->
                                <div class="d-sm-none col-6"></div>
                                <div class="col pt-1 pb-1">
                                    <b>Subtotal </b>
                                </div>
                                <div class="col pt-1 pb-1">
                                    <h4 class="text-danger" align="right" id="SubTotal"><!--${{number_format($total, 2, '.', ',')}}--></h4>
                                </div>
                            </div>
                            
                            <!-- Discount-->
                        <div class="row mb-3">
                            <div class="col pt-1 pb-1">
                                <b>Discount(%) </b>
                            </div>
                            <div class="col">
                                <input type="number" class="form-control" name="Discount" id="Discount"  min="0" max="100" step="0.01" value="0"/>
                            </div>
                        <!-- Total / Btn-->
                            <div class="col pt-2 ">
                                <b>Total</b>
                            </div>
                            <div class="col pt-2 " >
                                <h4 class="text-danger" align="right" id="Total_Discount"><!--${{number_format($total, 2, '.', ',')}}--></h4>
                            </div>
                        </div>
                            
                            <!-- Payment Method
                        <div class="row mb-4">
                            <div class="col">
                                <b>Payment </b>
                            </div>
                            <div class="col">
                                <input class="form-check-input border border-secondary" type="radio" value="0" name="Payment" id="Payment" checked>
                                <label class="form-check-label" for="Payment">
                                     Cash</label>
                            </div>
                            <div class="col">
                                <input class="form-check-input border border-secondary" type="radio" value="1" name="Payment" id="Payment">
                                <label class="form-check-label" for="Payment">
                                     KHQR</i></label>
                            </div>
                        </div> -->

                        <div class="row">
                            <div class="col-4">
                                <button class="main-btn danger-btn btn-hover BtnClearCart" style="height: 40px;">Clear</button>
                            </div>
                            <div class="col-4" align="center">
                                <button href="#0" class="main-btn success-btn btn-hover BtnPrintReceipt" style="height: 40px;"><i class="lni lni-printer"></i></button>
                            </div>
                            <div class="col-4" align="right">
                                <button href="#0" class="main-btn primary-btn btn-hover BtnSubmitOrder" style="height: 40px;">Submit</button>
                            </div>
                        </div>
                        <!-- End Total / Btn-->

                    </div>
                </div>
        <!-- End left side -->

        <!-- Right Side -->
            <div class="col-md-6">
                <div class="card-style shadow">
                    <!-- Search Product -->
                    <div class="input-style-2">
                        <input type="text" class="form-control" name="Product_Search" id="Product_Search" placeholder="Search Product...">
                        <input type="submit" class="form-control" id="SearchSubmit" style="display: none;">
                        <span class="icon"> <i class="lni lni-magnifier"></i> </span>
                    </div>

                    <!-- List Products -->
                    <div class="row" id="Product_List">

                        <!-- Product Item-->
                        <!-- @foreach ($products as $product)
                            <div class="col-md-3 col-lg-2 position-relative">
                                @if ($product->quantity > 0)
                                    <span class="position-absolute top-0 end translate-middle badge rounded-pill bg-danger"  style="z-index:2;">
                                    {{$product->quantity}}
                                    </span>   
                                @endif
                                <div class="card-style-2 mb-30 position-relative px-0">
                                    @if ($product->quantity == 0)
                                        <span class="position-absolute bottom-50 text-center" style="background-color: rgba(255, 255, 255, 0.7);">
                                            <h4 class="text-danger">Out of Stock</h4>
                                        </span>
                                    @endif      
                                    <div class="card-image" >
                                        <a href="/addcartimage/{{$product->product_id}}" <?php if($product->in_stock < 1) echo('style="pointer-events: none"'); ?>>
                                            <img src="{{asset($product->image)}}" alt="">
                                        </a>
                                    </div>
                                    <div class="card-content">
                                        <h5 align="center">{{$product->product_name}}</h5>
                                    </div>
                                </div>
                            </div>      
                        @endforeach -->
                        <!-- End Product Item -->

                    </div>
                    <!-- End Product List -->
                </div>
            </div>
        <!-- End right side -->

        <!-- Modal Receipt-->
        <div class="modal fade" id="FormModalReceipt" tabindex="-1" aria-labelledby="FormModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="col-12">
                        <div class="row">
                                <div class="col-lg-12"  id="PrintReceipt">
                                    <!-- Receipt Content -->
                                </div><!-- end col -->
                            <div class="d-print-none p-3">
                                <div class="float-end">
                                    <a href="#" class="btn btn-success" id="Print" onclick="printReceipt()"><i class="lni lni-printer"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Receipt -->

        </div> 
    <!-- End Content -->
                
            </div>
            <!-- end container -->
        </section>

        <?php 
            include("../layouts/footer.php");
        ?>

    </main>

</body>

    <?php 
        include("../layouts/script.php");
    ?>

    <script src="../js/index.js"></script>

</html>
    