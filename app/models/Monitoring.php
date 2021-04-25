<?php

class Monitoring{

    private $table = 'tds';
    
    public $db;
    public function __construct(){
        $this->db = new Database('localhost', 'root', '', 'monitoring');
    }

    public function getAll()
    {
        $this->db->query('SELECT * FROM ' . $this->table);
        return $this->db->resultSet();
    }

    public function insert($tds){
        $query = "INSERT INTO tds(id, tdsValue) VALUES (NOW(), '".$tds."')";
        $this->db->query($query);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function delete($id){
        $query = "DELETE FROM tds WHERE id <= '".$id."'";
        $this->db->query($query);
        $this->db->execute();
        return $this->db->rowCount();
    }
}