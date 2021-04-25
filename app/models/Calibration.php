<?php

class Calibration{

    private $table = 'calibration';
    
    public $db;
    public function __construct(){
        $this->db = new Database('localhost', 'u672325722_fahrul', 'Roni7991', 'u672325722_helberdata');
    }

    public function getCalibrationAndLimit(){
        $this->db->query('SELECT * FROM ' . $this->table);
        return $this->db->single();
    }

    public function setCalibrationAndLimit($calibrationValue, $limit, $lastCalibrationValue){
        $query = "UPDATE calibration SET calVal='".$calibrationValue."',tdsLimit='".$limit."' WHERE calVal='".$lastCalibrationValue."'";
       
        $this->db->query($query);
        $this->db->execute();
        return $this->db->rowCount();
    }
}