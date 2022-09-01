import Link from "next/link"
import styles from '../styles/Home.module.css'

export default function Navbar() {
  return (
    <div>
      
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

      <title>Register Hospital</title>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">HospiChain</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className='ml-5'>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link href="./Doctor"><a class="nav-link">Doctor Registration </a></Link>
              </li>
              <li class="nav-item active">
                <Link href="./Patient"><a class="nav-link" href="#">Patient Registration </a></Link>
              </li>
              <li class="nav-item active">
                <Link href="./Patient_details"><a class="nav-link" >View Patient Details </a></Link>
              </li>
              <li class="nav-item active">
                <Link href="./Records"><a class="nav-link">View Medical Record</a></Link>
              </li>
              <li class="nav-item active">
                <Link href="./Examine"><a class="nav-link">View Patient Report Details </a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}