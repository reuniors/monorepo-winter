<?php namespace  Reuniors\Knk\Classes\Meta;

class MetaData
{
    public $title;
    public $metaDescription;
    public $ogImage;
    public $defaultMetaDescription = 'Kuda na klopu?';
    protected $titlesPipes = [];

    public function addToTitle($titlePart)
    {
        if (!in_array($titlePart, $this->titlesPipes)) {
            array_unshift($this->titlesPipes, $titlePart);
            $this->title = implode(' | ', $this->titlesPipes);
        }
    }

    public function setMetaDescription($metaDescription)
    {
        $defaultDesc = $this->defaultMetaDescription
            ? $this->defaultMetaDescription . ' '
            : '';
        $this->metaDescription = $defaultDesc . $metaDescription;
    }

    public function __construct($defaultTitle = null, $defaultMetaDescription = null)
    {
        if ($defaultTitle) {
            $this->addToTitle($defaultTitle);
        }
        if ($defaultMetaDescription) {
            $this->defaultMetaDescription = $defaultMetaDescription;
        }
    }

    public function setOgImage($imagePath)
    {
        $this->ogImage = $imagePath;
    }
}
