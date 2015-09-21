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
 /*
  * @var Model the data model that this widget is associated with.
  */
    public $model;
 /*
  * @var attribute string the input value.
  */
    public $attribute;
 /* @var list array ['id'=>'value'] e.x. ['1'=>'Value 1' ...]  
  * - Array of values to add
  */
    public $list;
 /*
  *  Widget container options - Reserved (TODO)
  */
    public $options=[];
 /* Input data format. default: PGSQL (ex. {1,2,3})
  * TODO: New formats: ex JSON
  */
    public $dataformat='PGSQL';
   

    
    public function init() {
        parent::init();
        if (!isset($this->options['class'])) $this->options['class']='ejkot-arrayinput';
        $view=\Yii::$app->getView();
        $this->registerJS($view);
        arrayinputAsset::register($view);
        
        
    }
    
    public function run () {
        $value=  $this->model->getAttribute($this->attribute);
        $attribute=$this->attribute;
        $inputid=Html::getInputId($this->model, $this->attribute);
        $result=Html::input('text', Html::getInputName($this->model, $this->attribute), $value,['id'=>$inputid,'class'=>'hasArrayinput']);
        
        $items=$this->getDataArray($value);
        $output=Html::tag("ul",'',['class'=>'btn-group','id'=>'items-'.$inputid]);
        $output.=Html::tag("div",'',['class'=>'dropdown pull-right','id'=>'dropdown-'.$inputid]);
        $result.=$output;
        $result=Html::tag("div",$result,['class'=>$this->options['class']]);
        return $result;
    }
    
    private function getDataArray($value) {
        if ($this->dataformat=='PGSQL') {

            preg_match("/\{(.*)\}/Uis", $value,$digits);
            $items=explode(",",$digits[1]);
        }
        return $items;
    }
    
    private function registerJS($view) {
      //  $js0='var '.strtolower($this->model->formName()).'= [];';
      //  $view->registerJS($js0,$view::POS_HEAD);
        $js2="$('#".Html::getInputId($this->model, $this->attribute)."').kotArrayInput('init',{'list' : ".json_encode($this->list)."});";
        $view->registerJS($js2,$view::POS_END,'arrayinput'.$this->model->getAttribute($this->attribute));
        return;
    }
    
}
