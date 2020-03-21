<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usermodel extends CI_Model{
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function create($data){
        $this->db->insert('crud', $data);
    }

    public function showData(){
        $this->db->select(array('id','Name'));
        $query = $this->db->get('crud')->result_array();

		return $query;
    }

    public function updateData($id, $name){
		$this->db->set('Name', $name);
		$this->db->where(array('id' => $id));
		$this->db->update('crud');
    }

    function deleteData($id){
        $this->db->delete('crud', array('id' => $id));
    }
}


?>
