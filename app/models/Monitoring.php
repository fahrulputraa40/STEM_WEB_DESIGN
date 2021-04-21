<?php

class Monitoring{

    private $table = 'tds';
    
    public function __construct(){
        $this->db = new Database('localhost', 'root', '', 'monitoring');
    }

    public function getAll()
    {
        $this->db->query('SELECT * FROM ' . $this->table);
        return $this->db->resultSet();
    }
}