<?php

class Calibration{

    private $table = 'calibration';
    
    public $db;
    public function __construct(){
        $this->db = new Database('localhost', 'root', '', 'monitoring');
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