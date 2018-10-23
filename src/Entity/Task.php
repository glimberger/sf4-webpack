<?php declare(strict_types=1);


namespace App\Entity;


class Task
{
    protected $task;
    protected $dueDate;
    /** @var string */
    protected $foo;
    /** @var string */
    protected $bar;

    public function getTask()
    {
        return $this->task;
    }

    public function setTask($task)
    {
        $this->task = $task;
    }

    public function getDueDate(): \DateTime
    {
        return $this->dueDate;
    }

    public function setDueDate(\DateTime $dueDate = null)
    {
        $this->dueDate = $dueDate;
    }

    /**
     * @return string
     */
    public function getFoo(): string
    {
        return $this->foo;
    }

    /**
     * @param string $foo
     */
    public function setFoo(string $foo): void
    {
        $this->foo = $foo;
    }

    /**
     * @return string
     */
    public function getBar(): string
    {
        return $this->bar;
    }

    /**
     * @param string $bar
     */
    public function setBar(string $bar): void
    {
        $this->bar = $bar;
    }
}