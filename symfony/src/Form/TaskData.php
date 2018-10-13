<?php declare(strict_types=1);

namespace App\Form;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;

use App\Entity\Task;

class TaskData
{
    /**
     * @var string
     * @Assert\NotBlank)
     */
    public $task;

    /**
     * @var string
     * @Assert\NotBlank
     * @Assert\Date
     */
    public $dueDate;
    /**
     * @var string
     * @Assert\NotBlank
     */
    public $foo;
    /**
     * @var string
     * @Assert\NotBlank
     */
    public $bar;

    public static function create(Task $task): TaskData
    {
        return new self($task->getTask(), $task->getDueDate()->format('Y-m-d'), $task->getFoo(), $task->getBar());
    }

    public static function createFromRequest(Request $request): TaskData
    {
        $task = $request->request->get('task');
        $dueDate = $request->request->get('dueDate');
        $foo = $request->request->get('foo');
        $bar = $request->request->get('bar');

        return new self($task, $dueDate, $foo, $bar);
    }

    /**
     * TaskDate constructor.
     * @param string $task
     * @param string $dueDate
     * @param string $foo
     * @param string $bar
     */
    private function __construct(string $task, string $dueDate, string $foo, string $bar)
    {
        $this->task = $task;
        $this->dueDate = $dueDate;
        $this->foo = $foo;
        $this->bar = $bar;
    }
}