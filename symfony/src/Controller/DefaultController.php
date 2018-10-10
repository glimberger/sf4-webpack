<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/default", name="default")
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route("/bootstrap_legacy", name="bootstrap_legacy")
     */
    public function bootstrapLegacy(): Response
    {
        return $this->render('default/bootstrap_legacy.html.twig', [
            'title' => 'Bootstrap legacy'
        ]);
    }

    /**
     * @Route("/bootstrap_esm", name="bootstrap_esm")
     */
    public function bootstrapEsm(): Response
    {
        return $this->render('default/bootstrap_esm.html.twig', [
            'title' => 'Bootstrap ESM'
        ]);
    }
}
