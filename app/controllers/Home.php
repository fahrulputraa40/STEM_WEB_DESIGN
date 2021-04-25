<?php

class Home extends Controller{
    public function index(){
        $data['tds'] = $this->model('Monitoring')->getAll();
        $this->view('home/index', $data['tds']);
    }

    public function getCallibration(){
        $prevCalibration = $this->model('Calibration')->getCalibrationAndLimit();
        header('Content-Type: application/json');
        echo json_encode($prevCalibration);
    }

    public function getall()
    {
        $arr = [];
        $data['tds'] = $this->model('Monitoring')->getAll();
        foreach ($data['tds'] as &$value) {
            array_push($arr, json_encode($value));
        }
        header('Content-Type: application/json');
        echo json_encode($arr);
    }

    public function upload(){
        $calibration = $this->model('Calibration')->getCalibrationAndLimit();
        $calibration = $calibration["calVal"];
        
        $row = $this->model('Monitoring')->getAll();
        $count = 0;
        foreach ($row as &$value) {
            $count++;
        }
        if($count > 10){
            $this->model('Monitoring')->delete($row[0]['id']);
        }
        $data = json_decode(file_get_contents("php://input"));
        if($data->TSS != NULL){
            $res = 0;
            $x = floatval($data->TSS);
            $calibration = '$'.$calibration;
            eval("\$res = $calibration;");
            $res = strval($res);
            $this->model('Monitoring')->insert($res);
            header('Content-Type: application/json');
            echo '{"Status": "OK"}';

        }
        else{
            header('Content-Type: application/json');
            echo '{"Status": "ERROR"}';
        }
    }

    public function calibration(){
        $prevCalibration = $this->model('Calibration')->getCalibrationAndLimit();
        $param = [];
        $state = false;
        $param['cal'] = $prevCalibration['calVal'];
        $param['limit'] = $prevCalibration['tdsLimit'];
        if(isset($_GET['cal'])){
            if(strpos($_GET['cal'], $prevCalibration['calVal']) === false){
                $param['cal']=$_GET['cal'];
                $state = true;
            }
        }
        if(isset($_GET['limit'])){
            if(strpos($_GET['limit'], $prevCalibration['tdsLimit']) === false){
                $param['limit']=$_GET['limit'];
                $state = true;
            }
        }
        if($state === true){
            $this->model('Calibration')->setCalibrationAndLimit($param['cal'], $param['limit'], $prevCalibration['calVal']);   
            echo "ok";
        }
        else
            echo "Error param < 2, ".count($param);
    }

    public function ping(){
        $prevCalibration = $this->model('Calibration')->getCalibrationAndLimit();
        header('Content-Type: application/json');
        echo json_encode($prevCalibration);
    }

}