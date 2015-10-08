<?php
/*
 * @link https://github.com/ejkot/
 * @copyright ejkot software developer
 * @license Freeware
 * @version 0.1alpha
 */

namespace app\widgets\ejkot;
use yii\base\Widget;
use yii\helpers\Json;
use yii\helpers\Html;
use app\widgets\ejkot\assets\arrayinputAsset;
/**
 * Description of ArrayInput
 *
 * @author ejkot
 * 
 * usage ex. echo $form->field($content,'fieldname')->widget(ArrayInput::className(),['list'=>  ArrayHelper::map(ReferenceModel::find()->all(),'id','name')]);
 */
class ArrayInput extends Widget {
 /**
  *  Model the data model that this widget is associated with.
  * @var ActiveRecord
  */
    public $model;
    
 /** 
  * Аttribute string the input value
  * @var String
  */
    public $attribute;
    
 /**
  *  Array of values to add, or
  * Array of existing values, if ajax data source used.
  * format: ['id'=>'value'] e.x. ['1'=>'Value 1' ...] 
  * @var Array
  */
    public $list;
    
 /**
  *  Widget container options - Reserved (TODO)
  * @var Array
  */
    public $options=[];
    
 /**
  *  Input data format. default: PGSQL (ex. {1,2,3})
  * TODO: New formats: ex JSON
  * @var String
  */
    public $dataformat='PGSQL';
    
/** 
 * Ajax source - url for autocomplete data source 
 *  If Null - plugin make dropdown button with $list property array data source
 * ajax data format: array of objects e.x.: [{"id" : "1","short_name" : "Short name fo items","full_name" : "Full name for dropdown list"},...]
 * @var String
 */
    public $ajaxurl=Null;
    
/**
 *  beforeaddcallback - js callback fucntion,
 * called before add data to source input
 * Type : jsExpression
 * function must return true for success and add data, or false for break
 * @var jsExpression
 */
    public $beforeaddcallback=Null;
  
/**
 * Widget initialisation, add required javascript
 */    
    public function init() {
        parent::init();
        if (!isset($this->options['class'])) $this->options['class']='ejkot-arrayinput';
        $view=\Yii::$app->getView();
        $this->registerJS($view);
        arrayinputAsset::register($view);       
    }
    
/**
 * generate widet html code
 * @return Html
 */    
    
    public function run () {
        $value=  $this->model->getAttribute($this->attribute);
        $attribute=$this->attribute;
        $inputid=Html::getInputId($this->model, $this->attribute);
        $result=Html::input('text', Html::getInputName($this->model, $this->attribute), $value,['id'=>$inputid,'class'=>'hasArrayinput']);
        
        $items=$this->getDataArray($value);
        $output=Html::tag("ul",'',['class'=>'btn-group','id'=>'items-'.$inputid]);
        $output=Html::tag("div", $output, ['class'=>'col-lg-8']);
        if (!$this->ajaxurl) {
              $output2=Html::tag("div",'',['class'=>'dropdown pull-right','id'=>'dropdown-'.$inputid]);
        } else {
              $output2=Html::tag("div",'',['class'=>'pull-right ejkot-autoinput','id'=>'autoinput-'.$inputid]);
        }
        $output.=Html::tag("div",$output2,['class'=>'col-lg-4']);
        $result.=$output;
        $result=Html::tag("div",$result,['class'=>$this->options['class']." row"]);
        return $result;
    }
 /**
  * Convert Postgres database driver returning format for array fields to php array
  * String of postgres data in format {item1,item2...}
  * @param String $value
  * php data array
  * @return array
  */   
    private function getDataArray($value) {
        if ($this->dataformat=='PGSQL') {

            preg_match("/\{(.*)\}/Uis", $value,$digits);
            if (isset($digits[1]))
                $items=explode(",",$digits[1]); else $items=[];
        }
        return $items;
    }
/**
 * Register required javascript
 * View object for js register
 * @param View $view
 */    
    private function registerJS($view) {
        $js2="$('#".Html::getInputId($this->model, $this->attribute)."').kotArrayInput('init',{'list' : ".json_encode($this->list).",'ajaxurl' : '".$this->ajaxurl."'".($this->beforeaddcallback ? ",'beforeaddcallback' : ".$this->beforeaddcallback->expression :"") ."});";
        $view->registerJS($js2,$view::POS_END,'arrayinput'.$this->attribute);
    }
    
}
