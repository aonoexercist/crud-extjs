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
        $data = $this->usermodel->showData();
		$datas['data'] = $data;
		if($datas){
            header('Content-Type: application/json');
			echo json_encode($datas);
            // return $this->output
            // ->set_content_type('application/json')
            // ->set_status_header(500)
            // ->set_output(json_encode(array(
            //         $datas
            // )));
		}
    }

    public function update(int $id){
        header('Content-type: application/json');
        $json = json_decode(file_get_contents('php://input'),true);
        $name = $json['Name'];
        $this->usermodel->updateData($id, $name);
    }

    function delete(int $id){
        $this->usermodel->deleteData($id);
    }
}

?>