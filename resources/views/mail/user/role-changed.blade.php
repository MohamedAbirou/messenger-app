<x-mail::message>
    Hello {{ $user->name }},

    @if ($user->is_admin)
        You are now an administrator. You can now manage users and groups.
    @else
        Your role has been changed into regular user. You are no longer an administrator.
    @endif

    Thank you, <br>
    {{ config('app.name') }}
</x-mail::message>
