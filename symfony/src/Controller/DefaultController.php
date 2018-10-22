<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DefaultController extends AbstractController
{
    /**
     * @Route("/default", name="default")
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'title' => 'Symfony + Webpack playground',
        ]);
    }

    /**
     * @Route("/bootstrap_legacy", name="bootstrap_legacy")
     */
    public function bootstrapLegacy(): Response
    {
        return $this->render('default/bootstrap_legacy.html.twig', [
            'title' => 'Bootstrap legacy',
        ]);
    }

    /**
     * @Route("/bootstrap_esm", name="bootstrap_esm")
     */
    public function bootstrapEsm(): Response
    {
        return $this->render('default/bootstrap_esm.html.twig', [
            'title' => 'Bootstrap ESM',
        ]);
    }

    /**
     * @Route("/boostrap_react", name="bootstrap_react")
     *
     * @return Response
     */
    public function boostrapReact(): Response
    {
        return $this->render('default/bootstrap_react.html.twig', [
            'title' => 'Boostrap React',
        ]);
    }

    /**
     * @Route("/form_react", name="form_react")
     *
     * @return Response
     */
    public function newTaskForm(): Response
    {
        $task = new Task();
        $task->setTask('Write a blog post');
        $task->setDueDate(new \DateTime('tomorrow'));
        $task->setFoo('foo1');
        $task->setBar('bar11');

        // Data object
        $taskData = TaskData::create($task);

        return $this->render('default/task.form.html.twig', [
            'task'  => base64_encode($this->container->get('serializer')->serialize($taskData, 'json')),
            'title' => 'Form React',
        ]);
    }

    /**
     * @Route("/ajax_form_react_validate", name="ajax_form_react_validate")
     *
     * @param Request            $request
     * @param ValidatorInterface $validator
     * @return Response
     */
    public function newTaskFormValidate(Request $request, ValidatorInterface $validator): Response
    {
        $taskData = TaskData::createFromRequest($request);

        $errors = [];
        $violations = $validator->validate($taskData);
        /** @var ConstraintViolationInterface $violation */
        foreach ($violations as $violation) {
            $errors[$violation->getPropertyPath()] = $violation->getMessage();
        }

        return new JsonResponse($errors);
    }

    /**
     * @Route("/ajax_foos", name="ajax_foos")
     * @return JsonResponse
     */
    public function getFoos(): JsonResponse
    {
        $foos = [
            ['id' => '', 'text' => 'Sélectionnez un foo'],
            ['id' => 'foo1', 'text' => 'FOO 1'],
            ['id' => 'foo2', 'text' => 'FOO 2'],
            ['id' => 'foo3', 'text' => 'FOO 3'],
        ];
        return new JsonResponse($foos);
    }

    /**
     * @Route("/ajax_bars", name="ajax_bars_by_foo")
     * @param Request $request
     * @return JsonResponse
     */
    public function getBarsByFoo(Request $request): JsonResponse
    {
        $foo = $request->request->get('foo');

        $bars = [
            '' => [
                ['id' => '', 'text' => 'Pas de bar 🙁'],
            ],
            'foo1' => [
                ['id' => '', 'text' => 'Sélectionnez un bar'],
                ['id' => 'bar11', 'text' => 'BAR 11'],
                ['id' => 'bar12', 'text' => 'BAR 12'],
                ['id' => 'bar13', 'text' => 'BAR 13'],
            ],
            'foo2' => [
                ['id' => '', 'text' => 'Sélectionnez un bar'],
                ['id' => 'bar21', 'text' => 'BAR 21'],
                ['id' => 'bar22', 'text' => 'BAR 22'],
                ['id' => 'bar23', 'text' => 'BAR 23'],
            ],
            'foo3' => [
                ['id' => '', 'text' => 'Sélectionnez un bar'],
                ['id' => 'bar31', 'text' => 'BAR 31'],
                ['id' => 'bar32', 'text' => 'BAR 32'],
                ['id' => 'bar33', 'text' => 'BAR 33'],
            ],
        ];
        return new JsonResponse($bars[$foo] ?? []);
    }

    /**
     * @Route("/form_react_ref", name="form_react_ref")
     *
     * @param RouterInterface $router
     * @return Response
     */
    public function newTaskFormRef(RouterInterface $router): Response
    {
        $task = new Task();
        $task->setTask('Write a blog post');
        $task->setDueDate(new \DateTime('tomorrow'));
        $task->setFoo('foo1');
        $task->setBar('bar11');

        // Data object
        $taskData = TaskData::create($task);

        return $this->render('default/taskRef.form.html.twig', [
            'data'  => $this->container->get('serializer')->serialize([
                'task' => $taskData,
                '_url' => [
                    'fetchFoos' => $router->generate('ajax_foos'),
                    'fetchBars' => $router->generate('ajax_bars_by_foo'),
                    'validate'  => $router->generate('ajax_form_react_validate')
                ],
            ], 'json'),
            'title' => 'Form React',
        ]);
    }
}
