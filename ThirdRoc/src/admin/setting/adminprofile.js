import React from 'react'

const Adminprofile = () => {
  return (    
    <>
    
	<div class="main-container container-fluid px-0">

   <div class="page-header">
      <div class="page-leftheader">
         <h4 class="page-title mb-0 text-primary">Admin Profile</h4>
      </div>
   </div>
 
   <div class="row">
      <div class="col-xl-3 col-lg-4">
         <div class="card box-widget widget-user">
            <div class="widget-user-image mx-auto mt-5"><img alt="User Avatar" class="rounded-circle" src="../assets/img/1024-size.png"/></div>
            <div class="card-body text-center pt-2">
               <div class="pro-user">
                  <h3 class="pro-user-username  mb-1 fs-22">Admin</h3>
               </div>
			   <div class="upload__box">
					<div class="upload__btn-box">
						<label class="upload__btn">
							<p>Change Profile Photo</p>
							<input type="file" data-max_length="20" class="upload__inputfile"/>
						</label>
					</div>
				</div>
            </div>
           
         </div>
      </div>
      <div class="col-xl-9 col-lg-8">
         <div class="card">
            <div class="card-header ">
               <div class="card-title">Admin Profile</div>
            </div>
            <div class="card-body">
               <div class="card-title font-weight-bold">Basic info:</div>
               <div class="row">
                  <div class="col-sm-6 col-md-6">
                     <div class="form-group"> <label class="form-label">Company Name</label> 
					 <input type="text" class="form-control" placeholder="First Name" value="ThirdRoc"/> </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                     <div class="form-group"> <label class="form-label">Name</label> 
					 <input type="text" class="form-control" placeholder="Name" value="Super-Admin"/> </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                     <div class="form-group"> <label class="form-label">Email address</label> 
					 <input type="email" class="form-control" placeholder="Email" value=""/> </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                     <div class="form-group"> <label class="form-label">Phone Number</label> 
					 <input type="text" class="form-control" placeholder="Number" value=""/> </div>
                  </div>
                  {/* <div class="col-md-12">
                     <div class="form-group"> <label class="form-label">Address</label> 
					 <input type="text" class="form-control" placeholder="Home Address" value="3rd Lane,4th Phase,Street no-4 California"/> </div>
                  </div> */}
               </div>
            </div>
            {/* <div class="card-footer text-left"> <input type="button" name="next" class="next btn btn-primary mb-6 w-md mb-1 mt-1" value="Update"/></div> */}
         </div>
      </div>
   </div>
 
</div>
	
    </>
  )
}

export default Adminprofile