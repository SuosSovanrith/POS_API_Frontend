<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="../../public/assets/images/favicon.svg" type="image/x-icon" />
    <title>POS | Login</title>

    <!-- ========== All CSS files linkup ========= -->
    <link rel="stylesheet" href="../../public/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../../public/assets/css/lineicons.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../../public/assets/css/materialdesignicons.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../../public/assets/css/main.css" />
        
    <!-- ========== JQuery ========= -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <?php 
        session_start();
    ?>

  </head>
  <body>

      <!-- ========== signin-section start ========== -->
      <section class="signin-section">
        <div class="container-fluid">
          <!-- ========== title-wrapper start ========== -->
          <div class="title-wrapper pt-30">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Sign in</h2>
                </div>
              </div>
              <!-- end col -->
              <div class="col-md-6">
                <div class="breadcrumb-wrapper">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#0">Auth</a></li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Sign in
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
          <!-- ========== title-wrapper end ========== -->

          <div class="row g-0 auth-row">
            <div class="col-lg-6">
              <div class="auth-cover-wrapper bg-primary-100">
                <div class="auth-cover">
                  <div class="title text-center">
                    <h1 class="text-primary mb-10">Welcome Back</h1>
                    <p class="text-medium">
                      Sign in to your Existing account to continue
                    </p>
                  </div>
                  <div class="cover-image">
                    <img src="../../public/assets/images/auth/signin-image.svg" alt="" />
                  </div>
                  <div class="shape-image">
                    <img src="../../public/assets/images/auth/shape.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <!-- end col -->
            <div class="col-lg-6">
              <div class="signin-wrapper">
                <div class="form-wrapper">
            
                  <h6 class="mb-15">Sign In Form</h6>
                  <p class="text-sm mb-25">
                    Start creating the best possible user experience for you
                    customers.
                  </p>
                
                    <?php if(isset($_SESSION['message'])){ ?>
                        <div class="alert-box <?=$_SESSION['type']?>-alert">
                            <div class="alert">
                                <p class="text-medium">
                                <?=$_SESSION['message']?>
                                </p>
                            </div>
                        </div>  
                    <?php  unset($_SESSION['message']); unset($_SESSION['type']);}?>

                    <div class="row mt-5">
                      <div class="col-12">
                        <div class="input-style-1">
                          <label>Email</label>
                          <input type="email" placeholder="Email" name="Email" id="Email" required/>
                        </div>
                      </div>
                      <!-- end col -->
                      <div class="col-12">
                        <div class="input-style-1">
                          <label>Password</label>
                          <input type="password" placeholder="Password" name="Password" id="Password" required/>
                        </div>
                      </div>
                      <!-- end col -->
                      <div class="col-12 pt-5">
                        <div class="button-group d-flex justify-content-center flex-wrap">
                          <input type="submit" class="main-btn primary-btn btn-hover w-100 text-center" id="SignIn" value="Sign In" />
                        </div>
                      </div>
                    </div>
                    <!-- end row -->
                </div>
              </div>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
      </section>
      <!-- ========== signin-section end ========== -->

      <!-- ========== footer start =========== -->
      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6 order-last order-md-first">
              <div class="copyright text-center text-md-start">
                <p class="text-sm">
                  By Suos Sovanrith
                  </a>
                </p>
              </div>
            </div>
            <!-- end col-->
          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </footer>
      <!-- ========== footer end =========== -->

    <!-- ========= All Javascript files linkup ======== -->
    <?php 
        include("../layouts/script.php");
    ?>

    <script src="../js/login.js"></script>

  </body>
</html>