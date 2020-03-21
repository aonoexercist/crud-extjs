<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model('usermodel');
    }

    public function index(){
        $this->load->view('form');
    }

    public function insert(){
        header('Content-type: application/json');
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Credentials: true');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        // header('Access-Control-Max-Age: 1000');
        // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
        // $postdata = file_get_contents("php://input");
        // $json = json_decode($postdata, true);
        $json = json_decode(file_get_contents('php://input'),true);
        // foreach($json['data'] as $value){
        //     $test[]=$value;
        // }
        $data = array(
            'Name' => $json['Name']
        );
        if($data){
            $this->usermodel->create($data);
        }
    }

    public function select(){
        header('Content-type: application/json');
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Credentials: true');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        // header('Access-Control-Max-Age: 1000');
        // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

        $data = $this->usermodel->showData();
		$datas['data'] = $data;
		if($datas){
			echo json_encode($datas);
		}
    }

    public function update(int $id){
        header('Content-type: application/json');
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Credentials: true');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        // header('Access-Control-Max-Age: 1000');
        // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

        $json = json_decode(file_get_contents('php://input'),true);
        $name = $json['Name'];
        $this->usermodel->updateData($id, $name);
    }

    function delete(int $id){
        $this->usermodel->deleteData($id);
    }
}

?>