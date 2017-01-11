<?php

namespace EasyBoni\Model\Security;

use EasyBoni\Model\UserManager;
use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;
use Nette\Security\Identity;
use Nette\Security\IIdentity;
use Nette\Security\Passwords;

/**
 *
 * @author Marian Rusnak
 */
class Authenticator implements IAuthenticator
{
    /** @var UserManager */
    private $userManager;


    public function __construct(UserManager $userManager)
    {
        $this->userManager = $userManager;
    }


    /**
     * Performs an authentication against e.g. database.
     * and returns IIdentity on success or throws AuthenticationException
     *
     * @param array $credentials
     * @throws AuthenticationException
     * @return IIdentity
     */
    public function authenticate(array $credentials)
    {
        list($email, $password) = $credentials;

        $user = $this->userManager->findByEmail($email);

        if (!$user) {
            throw new AuthenticationException("User with email '$email' not found.", self::IDENTITY_NOT_FOUND);
        }

        $verified = Passwords::verify($password, $user->password);

        if (!$verified) {
            throw new AuthenticationException('Invalid password.', self::INVALID_CREDENTIAL);
        }

        $data = $user->toArray();
        unset($data['password']);

        return new Identity($user->id, NULL, $data);
    }
}
