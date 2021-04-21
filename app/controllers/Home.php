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
}