<?php

class Home extends Controller{
    public function index(){
        $data['tds'] = $this->model('Monitoring')->getAll();
        $this->view('home/index', $data['tds']);
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
            $this->model('Monitoring')->insert($data->TSS);
            header('Content-Type: application/json');
            echo '{"Status": "OK"}';
        }
        else{
            header('Content-Type: application/json');
            echo '{"Status": "ERROR"}';
        }
    }
}