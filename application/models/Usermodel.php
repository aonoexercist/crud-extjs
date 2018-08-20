<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usermodel extends CI_Model{
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function create($data){
        $this->db->insert('userdata', $data);
    }

    public function showData(){
        $this->db->select(array('id','Name'));
        $query = $this->db->get('userdata');
		foreach($query->result() as $row){
			$data[] = $row;
		}

		return $data;
    }

    public function updateData($id, $name){
		$this->db->set('Name', $name);
		$this->db->where(array('id' => $id));
		$this->db->update('userdata');
    }

    function deleteData($id){
        $this->db->delete('userdata', array('id' => $id));
    }
}


?>
